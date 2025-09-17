import { create } from "zustand";

interface Selectedcategory {
  categoryId: string;
  setCategoryId: (id: string) => void;
}

export const changeShowcaseStore = create<Selectedcategory>((set) => ({
  categoryId: "1",
  setCategoryId: (id: string) => {
    set(() => ({
      categoryId: id,
    }));
  },
}));
