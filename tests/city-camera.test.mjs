import test from "node:test";
import assert from "node:assert/strict";
import { BoxGeometry, CapsuleGeometry, CylinderGeometry, PerspectiveCamera, SphereGeometry, TorusGeometry, Vector3 } from "three";
import { featuredProjects, projects } from "../src/data/projects.ts";
import { buildingDimensions, journeyCameraPose, projectBounds, projectCameraPose } from "../src/lib/city-camera.ts";
import { useProjectStore } from "../src/store/useProjectStore.ts";

const viewports = [
  [320, 568], [390, 844], [430, 932], [768, 1024],
  [844, 390], [1024, 768], [1280, 720], [1920, 1080], [2560, 1440],
];

test("all featured and archived buildings, glow and labels fit beside the panel", () => {
  for (const [width, height] of viewports) {
    const canvasWidth = width >= 1024 ? width - 520 : width;
    const canvasHeight = width >= 1024 ? height - 88 : height * 0.54 - 88;
    for (const project of projects) {
      const camera = new PerspectiveCamera(48, canvasWidth / canvasHeight, 0.1, 250);
      const pose = projectCameraPose(project, camera.fov, camera.aspect);
      camera.position.copy(pose.position);
      camera.lookAt(pose.target);
      camera.updateMatrixWorld(true);

      const [x, y, z] = project.city.position;
      const [w, h, d] = project.city.scale;
      const { baseHeight, labelY } = buildingDimensions(project.buildingVariant, project.city.scale);
      const ground = y - h / 2 - baseHeight;
      const points = [];
      // Project actual geometry vertices, including variant crowns and the enlarged shell.
      const body = (project.buildingVariant === "organic" || project.buildingVariant === "pets") ? new CylinderGeometry(w * 0.45, w * 0.58, h, 12) :
        project.buildingVariant === "operations" ? new CylinderGeometry(w / 2, w / 2, h, 8) : new BoxGeometry(w, h, d);
      function addVertices(geometry, localY, glow = false) {
        const vertices = geometry.getAttribute("position");
        for (let i = 0; i < vertices.count; i++) {
          const vertex = new Vector3().fromBufferAttribute(vertices, i);
          if (glow) {
            vertex.multiply(project.buildingVariant === "flagship" ? new Vector3(1.15, 1.06, 1.15) : new Vector3(1.07, 1.04, 1.07));
            vertex.y += h * (project.buildingVariant === "flagship" ? 0.03 : 0.02);
          }
          vertex.y += localY;
          points.push(vertex.multiplyScalar(1.08).add(new Vector3(x, ground, z)));
        }
      }
      addVertices(body, h / 2 + baseHeight);
      addVertices(body, h / 2 + baseHeight, true);
      body.dispose();
      
      if (["operations", "pets", "agency"].includes(project.buildingVariant)) {
        const radius = w * (project.buildingVariant === "pets" ? 0.9 : 1);
        const thickness = project.buildingVariant === "operations" ? 0.7 : project.buildingVariant === "pets" ? 0.5 : 0.55;
        const plaza = new CylinderGeometry(radius, radius, thickness, 32);
        addVertices(plaza, thickness / 2);
        plaza.dispose();
      }
      if (project.buildingVariant === "operations") {
        for (const tilt of [-0.15, 0, 0.15]) {
          const ring = new TorusGeometry(w * 0.58, 0.055, 12, 48);
          ring.rotateY(Math.PI / 2 + tilt);
          addVertices(ring, h / 2 + baseHeight + 1.5);
          ring.dispose();
        }
        const antenna = new CylinderGeometry(0.035, 0.035, h * 0.22, 8);
        antenna.translate(w * 0.28, 0, 0);
        addVertices(antenna, h / 2 + baseHeight + h * 0.47);
        antenna.dispose();
        for (const side of [-1, 1]) {
          const panel = new BoxGeometry(w * 0.44, h * 0.2, 0.01);
          panel.rotateY(side * 0.18).translate(side * w * 0.78, 0, d * 0.1);
          addVertices(panel, h / 2 + baseHeight + h * 0.12);
          panel.dispose();
        }
      }
      if (project.buildingVariant === "pets") {
        const capsule = new CapsuleGeometry(w * 0.32, h * 0.56, 16, 28);
        addVertices(capsule, h / 2 + baseHeight);
        capsule.dispose();
        const dome = new SphereGeometry(w * 0.38, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2);
        addVertices(dome, h / 2 + baseHeight + h * 0.28);
        dome.dispose();
      }
      if (project.buildingVariant === "agency") {
        for (const tilt of [-0.12, 0.12]) {
          const rooftop = new BoxGeometry(w * 0.2, 0.75, d * 0.45);
          rooftop.rotateZ(tilt).translate(0.8, 0, 0);
          addVertices(rooftop, h + baseHeight + 0.4);
          rooftop.dispose();
        }
      }      if (project.buildingVariant === "flagship") {
        const plaza = new CylinderGeometry(w * 0.82, w * 0.9, 0.6, 32);
        addVertices(plaza, 0.3);
        plaza.dispose();
        const crown = new CylinderGeometry(w * 0.34, w * 0.4, 0.5, 8);
        addVertices(crown, h + 0.6 + 0.45);
        crown.dispose();
        for (const tiltY of [-0.08, 0.08]) for (const tiltZ of [-0.05, 0.05]) {
          const ring = new TorusGeometry(w * 0.36, 0.035, 12, 72);
          ring.rotateZ(tiltZ).rotateY(tiltY).rotateX(Math.PI / 2);
          addVertices(ring, h + 0.6 + 0.82);
          ring.dispose();
        }
      }
      // Billboard corners in camera space, including the largest project name.
      const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      const up = new Vector3(0, 1, 0).applyQuaternion(camera.quaternion);

      const label = new Vector3(x, ground + labelY * 1.08, z);
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
        points.push(label.clone().addScaledVector(right, sx * 3.75 * 1.08)
          .addScaledVector(up, sy * 0.7 * 1.08));
      }
      for (const point of points) {
        const projected = point.project(camera);
        const context = `${project.id} at ${width}x${height}: ${projected.toArray()}`;
        assert.ok(Math.abs(projected.x) < 0.94, `Horizontal crop: ${context}`);
        assert.ok(Math.abs(projected.y) < 0.94, `Vertical crop: ${context}`);
        assert.ok(projected.z > -1 && projected.z < 1, `Near/far crop: ${context}`);
      }
    }
  }
});

test("project bases sit on the avenue ground", () => {
  for (const { id, city, buildingVariant } of projects) {
    assert.ok(Math.abs(city.position[1] - city.scale[1] / 2 - buildingDimensions(buildingVariant, city.scale).baseHeight + 1.8) < 1e-9, id);
  }
});

test("normal scrolling keeps the current project inside the space above the caption", () => {
  const sizes = [...viewports, [1877, 898], [1897, 916]];
  for (const [width, height] of sizes) {
    const captionHeight = Math.max(190, Math.min(height * 0.3, 260));
    const sceneHeight = height - 88 - captionHeight;
    const camera = new PerspectiveCamera(48, width / sceneHeight, 0.1, 250);
    camera.setViewOffset(width, sceneHeight, 0, 0, width, height - 88);
    for (let percent = 0; percent <= 1000; percent++) {
      const progress = percent / 1000;
      const pose = journeyCameraPose(progress, featuredProjects, camera.fov, camera.aspect);
      camera.position.copy(pose.position);
      camera.lookAt(pose.target);
      camera.updateMatrixWorld(true);
      const box = projectBounds(featuredProjects[pose.index]);
      for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
        const p = new Vector3(x, y, z).project(camera);
        p.y = 1 - (1 - p.y) * (height - 88) / sceneHeight;
        const context = `${width}x${height}, progress ${progress}, ${featuredProjects[pose.index].id}`;
        assert.ok(Math.abs(p.x) < 0.96 && Math.abs(p.y) < 0.96 && p.z > -1 && p.z < 1, context);
      }
    }
  }
});

test("the construction fits above the caption at the end of the journey", () => {
  for (const [width, height] of viewports) {
    const sceneHeight = height - 88 - Math.max(190, Math.min(height * 0.3, 260));
    const camera = new PerspectiveCamera(48, width / sceneHeight, 0.1, 250);
    camera.setViewOffset(width, sceneHeight, 0, 0, width, height - 88);
    const pose = journeyCameraPose(1, featuredProjects, camera.fov, camera.aspect);
    camera.position.copy(pose.position);
    camera.lookAt(pose.target);
    camera.updateMatrixWorld(true);
    for (const x of [-3.5, 3.5]) for (const y of [-1.8, 9.5]) for (const z of [-73.5, -66.5]) {
      const p = new Vector3(x, y, z).project(camera);
        p.y = 1 - (1 - p.y) * (height - 88) / sceneHeight;
      assert.ok(Math.abs(p.x) < 0.96 && Math.abs(p.y) < 0.96, `Construction at ${width}x${height}`);
    }
  }
});
test("cancelled and superseded camera arrivals cannot reopen an old panel", () => {
  const store = useProjectStore.getState();
  store.selectProject(projects[0].id);
  assert.equal(useProjectStore.getState().focusedProjectId, null);
  store.selectProject(projects[1].id);
  store.focusProject(projects[0].id);
  assert.equal(useProjectStore.getState().focusedProjectId, null);
  store.focusProject(projects[1].id);
  assert.equal(useProjectStore.getState().focusedProjectId, projects[1].id);
  store.selectProject(null);
  store.focusProject(projects[1].id);
  assert.equal(useProjectStore.getState().focusedProjectId, null);
  assert.equal(useProjectStore.getState().selectedProjectId, null);
});




