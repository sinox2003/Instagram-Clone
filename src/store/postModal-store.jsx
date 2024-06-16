import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";

const postModalStore=create((set)=>({

    isOpen:false,
    onOpen:()=>set({isOpen:true}) ,
    onClose:()=>set({isOpen:false}),
    url:'',
    setUrl:(url)=>set({url:url})



}));

  export  const usePostModalSelector=createSelectors(postModalStore)