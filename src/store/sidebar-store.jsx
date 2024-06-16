import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";


const useSidebarStore = create((set) => ({

    isSidebarMinimized: false,
    minimizeSidebar:(value) => set({isSidebarMinimized: value}),
    onClose:()=>{} ,
    setOnClose:(onClose)=>set({onClose: onClose}),
    isDrawerOpen:false,
    setIsDrawerOpen:(value)=>set({isDrawerOpen: value}),



    })

);
export const useSidebarSelector=createSelectors(useSidebarStore)

