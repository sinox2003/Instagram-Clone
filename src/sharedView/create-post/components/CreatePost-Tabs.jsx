import React, {useState} from 'react';
import {TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import UploadImageTab from "./tabs/UploadImage-tab.jsx";
import ImageCropTab from "./tabs/ImageCrop-Tab.jsx";
import ImageEditTab from "./tabs/ImageEdit-Tab.jsx";
import PostCaptionTab from "./tabs/PostCaption-Tab.jsx";

function CreatePostTabs({closeModal}) {
    const [index, setIndex] = useState(0);





    const handleSelect = (index) => {
        setIndex(index);
    };



    return (
        <Tabs index={index} isLazy borderRadius={'2xl'} height='full'  >
            <TabPanels height='full'>
                <TabPanel p='0'>
                    <UploadImageTab handleSelect={handleSelect} closeModal={closeModal} />
                </TabPanel>
                <TabPanel p='0'>
                    <ImageCropTab handleSelect={handleSelect} />
                </TabPanel>
                <TabPanel p='0' >
                    <ImageEditTab handleSelect={handleSelect} />
                </TabPanel>
                <TabPanel p='0' >
                    <PostCaptionTab closeModal={closeModal} handleSelect={handleSelect}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    // w={`calc(100% + 200px)`}
    );
}

export default CreatePostTabs;
