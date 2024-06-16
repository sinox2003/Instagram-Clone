import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";


const postLikesStore=create((set)=>({

    isOpen:false,
    onLikesOpen:()=>set({isOpen:true}) ,
    onClose:()=>set({isOpen:false}),
    postId:'',
    setPostId:(id)=>set({postId:id}),


}));


export const usePostLikesSelector=createSelectors(postLikesStore)