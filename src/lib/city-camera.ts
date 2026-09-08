import { Box3, MathUtils, Sphere, Vector3 } from "three";
import type { BuildingVariant, Project } from "../data/projects";

export const SELECTED_BUILDING_SCALE = 1.08;

export function journeyCameraPose(progress: number, projects: Project[], verticalFov: number, aspect: number) {
  if (projects.length === 0) return { index: 0, target: new Vector3(0, 4, -70), position: new Vector3(0, 4, -40) };
  const step = MathUtils.clamp(progress, 0, 1) * projects.length;
  const index = Math.min(Math.floor(step), projects.length - 1);
  const fraction = Math.min(step - index, 1);
  const currentZ = projects[index].city.position[2];
  const nextZ = projects[index + 1]?.city.position[2] ?? -70;
  const targetZ = MathUtils.lerp(currentZ, nextZ, fraction);

  // Fit the district we are entering instead of pulling back to fit the entire
  // skyline. Keep the active project readable while the side streets feel close.
  const cityBounds = projectBounds(projects[index]);
  const nextProject = projects[index + 1];
  if (nextProject) cityBounds.union(projectBounds(nextProject));
  else {
    cityBounds.expandByPoint(new Vector3(-3.5, -1.8, -73.5));
    cityBounds.expandByPoint(new Vector3(3.5, 9.5, -66.5));
  }
  const centerY = (cityBounds.min.y + cityBounds.max.y) / 2;
  const halfHeight = (cityBounds.max.y - cityBounds.min.y) / 2;
  const halfWidth = Math.max(Math.abs(cityBounds.min.x), Math.abs(cityBounds.max.x));
  const tanVertical = Math.tan(MathUtils.degToRad(verticalFov / 2));
  const tanHorizontal = tanVertical * Math.max(aspect, 0.1);
  const nearEdge = Math.max(0, cityBounds.max.z - targetZ);
  const distance = Math.max(halfHeight / tanVertical, halfWidth / tanHorizontal) * 1.08 + nearEdge + 1.5;
  return {
    index,
    target: new Vector3(0, centerY, targetZ),
    position: new Vector3(0, centerY, targetZ + distance),
  };
}

export function buildingDimensions(variant: BuildingVariant, scale: [number, number, number]) {
  const [width, height, depth] = scale;
  const organic = variant === "organic";
  const plaza = variant === "flagship" || variant === "pets" ? 1.8 :
    variant === "operations" || variant === "agency" ? 2 : 0;
  const footprintWidth = plaza ? width * plaza : organic ? width * 1.16 : width;
  const footprintDepth = plaza ? Math.max(width * plaza, depth) : organic ? width * 1.16 : depth;
  const baseHeight = variant === "flagship" || variant === "pets" ? 0.6 :
    variant === "operations" ? 0.75 : variant === "agency" ? 0.625 : 0;
  const crownHeight = organic ? 0.5 + width * 0.3 : 0;
  return { width: footprintWidth, depth: footprintDepth, height, baseHeight,
    labelY: height + baseHeight + (variant === "flagship" ? 2.6 :
      variant === "operations" ? 2 : variant === "agency" ? 1.8 : variant === "pets" ? 1.15 : crownHeight + 1.25) };
}

// Includes the glow shell and the label, not just the solid building.
export function projectBounds(project: Project): Box3 {
  const [x, y, z] = project.city.position;
  const { width, height, depth, labelY, baseHeight } = buildingDimensions(project.buildingVariant, project.city.scale);
  const scale = SELECTED_BUILDING_SCALE;
  const ground = y - height / 2 - baseHeight;
  const halfWidth = Math.max(width * 1.07, 8) * scale / 2;
  const halfDepth = depth * 1.07 * scale / 2;
  return new Box3(
    new Vector3(x - halfWidth, ground, z - halfDepth),
    new Vector3(x + halfWidth, ground + Math.max(height * 1.04, labelY + 0.75) * scale, z + halfDepth),
  );
}

export function projectCameraPose(project: Project, verticalFov: number, aspect: number) {
  const sphere = projectBounds(project).getBoundingSphere(new Sphere());
  const verticalHalfFov = MathUtils.degToRad(verticalFov / 2);
  const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * Math.max(aspect, 0.1));
  const distance = sphere.radius / Math.sin(Math.min(verticalHalfFov, horizontalHalfFov)) * 1.12;
  const side = project.city.position[0] < 0 ? 1 : -1;
  const direction = new Vector3(side * 0.4, 0.16, 1).normalize();
  return {
    target: sphere.center,
    position: sphere.center.clone().addScaledVector(direction, distance),
  };
}
