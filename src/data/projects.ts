export type BuildingVariant =
  | "flagship" | "operations" | "pets" | "agency" | "memorial"
  | "corporate" | "data" | "organic" | "legal";

export type ProjectCityData = {
  position: [number, number, number];
  scale: [number, number, number];
};

export type Project = {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  year: number;
  accent: string;
  description: string;
  buildingVariant: BuildingVariant;
  featured: boolean;
  featuredOrder?: number;
  repository?: string;
  city: ProjectCityData;
};

export type ProjectDefinition = Omit<Project, "city"> & {
  city?: { scale: [number, number, number] };
};

// Add completed projects here. Only the first five featured entries, ordered by
// featuredOrder, receive an avenue slot; all others remain in the archive.
export const projectCatalog: ProjectDefinition[] = [
  {
    id: "jardines-web-2026",
    title: "Jardines del Renacer Web 2026",
    shortTitle: "Jardines 2026",
    category: "Enterprise Web Ecosystem",
    year: 2026,
    accent: "#3B82F6",
    description: "A modern digital ecosystem for Jardines del Renacer integrating services, plans, locations, interactive coverage, obituaries and multiple digital experiences into a unified platform.",
    buildingVariant: "flagship",
    featured: true,
    featuredOrder: 1,
    repository: "https://github.com/JuanMonza/web_jardines_del_renacer_2026",
    city: { scale: [5.8, 14, 5.5] },
  },
  {
    id: "aura-master",
    title: "Aura Master",
    shortTitle: "Aura",
    category: "Operations & Media Platform",
    year: 2026,
    accent: "#8B5CF6",
    description: "Central operations platform designed to manage digital media, obituaries, presentations and room experiences through a unified administrative environment.",
    buildingVariant: "operations",
    featured: true,
    featuredOrder: 2,
    city: { scale: [4.8, 12, 4.8] },
  },
  {
    id: "renacer-mascotas",
    title: "Renacer Mascotas V2",
    shortTitle: "Renacer Mascotas",
    category: "Digital Product Experience",
    year: 2026,
    accent: "#22D3EE",
    description: "A digital platform focused on the Renacer Mascotas ecosystem, combining brand experience, services and specialized digital interactions.",
    buildingVariant: "pets",
    featured: true,
    featuredOrder: 3,
    repository: "https://github.com/JuanMonza/Renacer-mascotas-V2",
    city: { scale: [4.7, 10, 4.7] },
  },
  {
    id: "locos-digital-marketing",
    title: "Locos Digital Marketing",
    shortTitle: "Locos Digital",
    category: "Digital Business Platform",
    year: 2026,
    accent: "#F59E0B",
    description: "Commercial digital experience created around marketing, technology and modern online business presentation.",
    buildingVariant: "agency",
    featured: true,
    featuredOrder: 4,
    repository: "https://github.com/JuanMonza/Locos-Digital-Marketing",
    city: { scale: [4.8, 9.5, 4.8] },
  },
  {
    id: "condolencias-digitales",
    title: "Condolencias Digitales",
    shortTitle: "Condolencias",
    category: "Full Stack Business Platform",
    year: 2026,
    accent: "#60A5FA",
    description: "Digital condolences platform designed around funeral-room operations, role-based administration, data management and automated digital processes.",
    buildingVariant: "memorial",
    featured: true,
    featuredOrder: 5,
    repository: "https://github.com/JuanMonza/S.M-Condolencias-J.R-Salas-",
    city: { scale: [4.8, 10, 4.8] },
  },
  {
    id: "membresias",
    title: "Membresías 2026",
    shortTitle: "Membresías",
    category: "Business Platform",
    year: 2026,
    accent: "#22d3ee",
    description: "Membership and redemption platform connecting users, partner businesses and transaction logs.",
    buildingVariant: "corporate",
    featured: false,
    city: { scale: [4.2, 9.6, 4.2] },
  },
  {
    id: "marketing-dashboard",
    title: "Marketing Dashboard",
    shortTitle: "Dashboard",
    category: "Analytics",
    year: 2026,
    accent: "#60a5fa",
    description: "Central dashboard consolidating campaign tools, visitor data and operational analytics.",
    buildingVariant: "data",
    featured: false,
    city: { scale: [4.7, 11.4, 4.7] },
  },
  {
    id: "renacer-abogados",
    title: "Renacer Abogados",
    shortTitle: "Abogados",
    category: "Corporate Experience",
    year: 2026,
    accent: "#a78bfa",
    description: "Premium legal-services web experience with brand identity and conversion-focused UX.",
    buildingVariant: "legal",
    featured: false,
    city: { scale: [4.5, 10.8, 4.5] },
  },
];

export function arrangeProjects(catalog: ProjectDefinition[]) {
  const candidates = catalog.filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity)).slice(0, 5);
  const featuredIds = new Set(candidates.map((project) => project.id));
  const archive = catalog.filter((project) => !featuredIds.has(project.id));
  const place = (project: ProjectDefinition, index: number, featured: boolean): Project => {
    const originalScale = project.city?.scale ?? [4, 9, 4];
    const scale = originalScale.map((value) => value * (featured ? 1 : 0.8)) as [number, number, number];
    const side = index % 2 === 0 ? -1 : 1;
    // The flagship's broad plaza needs more pavement than a standard tower.
    const plazaRadius = project.buildingVariant === "flagship" || project.buildingVariant === "pets" ? scale[0] * 0.9 :
      project.buildingVariant === "operations" || project.buildingVariant === "agency" ? scale[0] : 3.6;
    const x = featured ? side * (plazaRadius + 4.2)
      : side * (19 + Math.floor(index / 12) * 8);
    const z = featured ? -15 - index * 12 : -15 - (Math.floor(index / 2) % 6) * 10;
    const baseHeight = project.buildingVariant === "flagship" || project.buildingVariant === "pets" ? 0.6 :
      project.buildingVariant === "operations" ? 0.75 : project.buildingVariant === "agency" ? 0.625 : 0;
    return { ...project, featured, city: { position: [x, -1.8 + baseHeight + scale[1] / 2, z], scale } };
  };
  const featuredProjects = candidates.map((project, index) => place(project, index, true));
  const archivedProjects = archive.map((project, index) => place(project, index, false));
  return { projects: [...featuredProjects, ...archivedProjects], featuredProjects, archivedProjects };
}

export const { projects, featuredProjects, archivedProjects } = arrangeProjects(projectCatalog);
