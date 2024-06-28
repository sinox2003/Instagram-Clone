import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";


const sharePostStore=create((set)=>({

    isOpen:false,
    onOpen:()=>set({isOpen:true}) ,
    onClose:()=>set({isOpen:false}),
    message:'',
    setMessage:(id)=>set({message:id}),
    image:null,
    setImage:(image)=>set({image:image}),


}));

export const  useSharePostSelector=createSelectors(sharePostStore)