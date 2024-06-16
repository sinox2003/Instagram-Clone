import {useSliderAlertSelector} from "../store/sliderAlert-store.jsx";


const useSliderAlert = () => {


    const isOpen = useSliderAlertSelector.use.isSliderAlertOpen();

    const setIsOpen = useSliderAlertSelector.use.setIsSliderAlertOpen();
    const onClose = useSliderAlertSelector.use.closeSliderAlert();
    const message = useSliderAlertSelector.use.message();
    const setMessage = useSliderAlertSelector.use.setMessage();


    const setIsSliderAlertOpen =(value,msg)=>{

        setIsOpen(value)
        setMessage(msg)
    }



    return{
        isOpen,
        setIsSliderAlertOpen,
        onClose,
        message,

    }


};

export default useSliderAlert;