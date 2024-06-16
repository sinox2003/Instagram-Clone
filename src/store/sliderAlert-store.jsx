import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";


const sliderAlertStore = create((set)=>({

    isSliderAlertOpen:false,
    setIsSliderAlertOpen:(value)=>set({isSliderAlertOpen: value}),
    closeSliderAlert:()=>set({isSliderAlertOpen: false}),
    message:"",
    setMessage:(value)=>set({message: value}),

}))

export const useSliderAlertSelector=createSelectors(sliderAlertStore)


