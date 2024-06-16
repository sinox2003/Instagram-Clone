import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";


const sharePostStore=create((set)=>({

    isOpen:false,
    onOpen:()=>set({isOpen:true}) ,
    onClose:()=>set({isOpen:false}),
    postId:'',
    setPostId:(id)=>set({postId:id}),


}));

export const  useSharePostSelector=createSelectors(sharePostStore)