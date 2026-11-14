import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLinksStore = create(
  persist(
    (set) => ({
      links: [],

      addLink: (link) => {
        set((state) => ({
          links: [...state.links, link],
        }));
      },

      removeLink: (id) => {
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        }));
      },

      updateLink: (id, data) => {
        set((state) => ({
          links: state.links.map((link) => {
            return link.id === id ? { ...link, ...data } : link;
          }),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          links: state.links.map((link) => {
            return link.id === id
              ? { ...link, favorite: !link.favorite }
              : link;
          }),
        }));
      },
    }),
    {
      name: "links-storage",
    },
  ),
);
