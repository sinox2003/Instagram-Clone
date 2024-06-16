import {useSidebarSelector} from "../store/sidebar-store.jsx";

const useToggleSidebar = () => {


    const isSidebarMinimized = useSidebarSelector.use.isSidebarMinimized()

    const minimizeSidebar=useSidebarSelector.use.minimizeSidebar()

    const close=useSidebarSelector.use.onClose()

    const setOnClose = useSidebarSelector.use.setOnClose()

    const isDrawerOpen=useSidebarSelector.use.isDrawerOpen()

    const setIsDrawerOpen=useSidebarSelector.use.setIsDrawerOpen()



    const setClose=(onClose)=>{

        setOnClose(onClose)
    }


    const  toggleDrawer=(value)=>{

            setIsDrawerOpen(value)


    }

    // toggle sidebar
    const toggle=(value)=>{


        minimizeSidebar(value);


    }

    return {
        isSidebarMinimized,
        toggle,
        setClose,close,isDrawerOpen,toggleDrawer
    };
};

export default useToggleSidebar;