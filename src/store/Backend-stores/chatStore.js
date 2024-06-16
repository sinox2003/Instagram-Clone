import { create } from "zustand";

const useChatStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("selected-user")) || null,
	unsetUser: () => set({ user: null }),
	setUser: (user) => set({ user }),
}));

export default useChatStore;