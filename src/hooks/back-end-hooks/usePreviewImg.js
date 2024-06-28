import {useState} from "react";
import useShowToast from "../useShowToast.jsx";

const usePreviewImg = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const showToast = useShowToast();
	const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB


	// const authUser = useAuthStore((state) => state.user);


	// const setProfilePic= () => {
	// 	console.log(authUser.profilePicURL)
	// 	setSelectedFile( authUser.profilePicURL)
	//
	// }



	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			if (file.size > maxFileSizeInBytes) {
				showToast("Error", "File size must be less than 2MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			reader.onloadend = () => {
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("Error", "Please select an image file", "error");
			setSelectedFile(null);
		}
	};

	const removeProfilePic = () => {
		setSelectedFile(null);
	};

	return { selectedFile, handleImageChange, removeProfilePic, setSelectedFile };
};

export default usePreviewImg;
