import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";

const postOptionsStore=create((set)=>({

    isOpen:false,
    onOpen:()=>set({isOpen:true}) ,
    onClose:()=>set({isOpen:false}),
    postId:'',
    setPostId:(id)=>set({postId:id}),
    postOwner:null,
    setPostOwner:(postOwner)=>set({postOwner:postOwner}),



}));

export  const usePostOptionsSelector=createSelectors(postOptionsStore)