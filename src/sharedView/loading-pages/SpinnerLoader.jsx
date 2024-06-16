import React from 'react';
import {Center, Spinner} from "@chakra-ui/react";

function SpinnerLoader(props) {
    return (
        <Center pt={30} >
            <Spinner  />
        </Center>
    );
}

export default SpinnerLoader;