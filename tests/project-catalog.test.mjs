import test from "node:test";
import assert from "node:assert/strict";
import { arrangeProjects, projectCatalog } from "../src/data/projects.ts";

test("the curated avenue has five projects, with Jardines first", () => {
  const result = arrangeProjects(projectCatalog);
  assert.deepEqual(result.featuredProjects.map((p) => p.id), [
    "jardines-web-2026", "aura-master", "renacer-mascotas", "locos-digital-marketing", "condolencias-digitales",
  ]);
  assert.deepEqual(result.archivedProjects.map((p) => p.id), ["membresias", "marketing-dashboard", "renacer-abogados"]);
});

test("new archive entries do not displace any featured project", () => {
  const before = arrangeProjects(projectCatalog);
  const result = arrangeProjects([...projectCatalog, { ...projectCatalog[5], id: "new-project", city: undefined }]);
  assert.deepEqual(result.featuredProjects, before.featuredProjects);
  assert.ok(result.archivedProjects.some((p) => p.id === "new-project"));
  assert.equal(new Set(result.projects.map((p) => p.id)).size, result.projects.length);
});

test("promoting an archive project preserves a five-slot avenue and keeps the displaced project", () => {
  const definitions = projectCatalog.map((p) => p.id === "membresias" ? { ...p, featured: true, featuredOrder: 0 } : p);
  const result = arrangeProjects(definitions);
  assert.equal(result.featuredProjects.length, 5);
  assert.equal(result.featuredProjects[0].id, "membresias");
  assert.equal(result.projects.length, projectCatalog.length);
  assert.ok(result.archivedProjects.some((p) => p.id === "condolencias-digitales"));
  assert.ok(result.archivedProjects.every((p) => !p.featured && Math.abs(p.city.position[0]) >= 19));
  assert.equal(projectCatalog.find((p) => p.id === "membresias").featured, false);
});
