import { CreatePostSelector } from "../store/createPost-store.jsx";
import useCreatePost from "./back-end-hooks/useCreatePost.js";
import useShowToast from "./useShowToast.jsx";
import { useEffect, useState } from "react";

export const usePreparePost = () => {
    const setImage = CreatePostSelector.use.setImage();
    const imageSrc = CreatePostSelector.use.image();
    const setCroppedImage = CreatePostSelector.use.setCroppedImage();
    const croppedImageSrc = CreatePostSelector.use.croppedImage();
    const setEditedImage = CreatePostSelector.use.setEditedImage();
    const editedImageSrc = CreatePostSelector.use.editedImage();
    const caption = CreatePostSelector.use.caption();
    const setCaptionValue = CreatePostSelector.use.setCaption();





    const setImageSrc = (value) => {
        setImage(value);
        setCroppedImage(null);
        setEditedImage(null);
    };

    const setCroppedImageSrc = (croppedArea) => {
        setEditedImage(null);
        const canvas = document.createElement('canvas');
        canvas.width = croppedArea.width;
        canvas.height = croppedArea.height;
        const ctx = canvas.getContext('2d');
        const imageObj = new Image();
        imageObj.src = imageSrc;
        imageObj.onload = () => {
            ctx.drawImage(
                imageObj,
                croppedArea.x,
                croppedArea.y,
                croppedArea.width,
                croppedArea.height,
                0,
                0,
                croppedArea.width,
                croppedArea.height
            );

            setCroppedImage(canvas.toDataURL('image/png'));
        };
    };

    const setEditedImageSrc = (filter) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.filter = filter;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            setEditedImage(canvas.toDataURL('image/png'));
        };
        img.src = croppedImageSrc;
    };



    return {
        setImageSrc,
        imageSrc,
        setCroppedImageSrc,
        croppedImageSrc,
        setEditedImageSrc,
        editedImageSrc,

        setCaptionValue,
        caption,
    };
};
