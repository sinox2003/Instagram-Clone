import {create} from "zustand";
import {createSelectors} from "./selector-creater/create-selector.jsx";

const CreatePostStore = create((set)=>({
        image: null,
        setImage:(value)=>set({image:value}),
        croppedImage: null,
        setCroppedImage:(value)=>set({croppedImage:value}),
        editedImage: null,
        setEditedImage:(value)=>set({editedImage:value}),
        caption: null,
        setCaption:(value)=>set({caption:value}),




}))
export const CreatePostSelector=createSelectors(CreatePostStore)
