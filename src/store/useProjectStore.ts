import { create } from "zustand";

type ProjectStore = {
  selectedProjectId: string | null;
  hoveredProjectId: string | null;
  focusedProjectId: string | null;

  selectProject: (id: string | null) => void;
  hoverProject: (id: string | null) => void;
  focusProject: (id: string) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProjectId: null,
  hoveredProjectId: null,
  focusedProjectId: null,

  selectProject: (id) => {
    set({
      selectedProjectId: id,
      hoveredProjectId: null,
      focusedProjectId: null,
    });
  },

  hoverProject: (id) => {
    set({
      hoveredProjectId: id,
    });
  },
  focusProject: (id) => {
    set((state) => state.selectedProjectId === id ? { focusedProjectId: id } : state);
  },
}));
