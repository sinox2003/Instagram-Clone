import {menuAnatomy} from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers, defineStyle} from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
    list: {
        py: '2',


        borderRadius: 'xl',
        border: 'none',
        bg: 'white',
        boxShadow: '-1px 0px 10px rgba(0, 0, 0 , 0.3)',
        _dark: {
            bg: '#262626',
        },
    },
    item: {
        borderRadius: 'md',
        py: '3',
        width: '94%',
        mx: '3%',
        bg: 'transparent',
        _hover: {
            bg: 'blackAlpha.100',
        },
        _focus: {
            bg: 'blackAlpha.100',
        },
        _dark: {
            _hover: {
                bg: 'whiteAlpha.200',
            },
            _focus: {
                bg: 'whiteAlpha.200',
            },
        },
    },
    groupTitle: {
        textTransform: 'uppercase',
        color: 'white',
        letterSpacing: 'wider',
        opacity: '0.7',
    },
    command: {
        opacity: '0.8',
        fontFamily: 'mono',
        fontSize: 'sm',
        letterSpacing: 'tighter',
        pl: '4',
    },
    divider: {
        borderColor: 'blackAlpha.300',
        _dark: {
            borderColor: 'whiteAlpha.300',
        },
    },
});

// define custom styles
const lg = defineStyle({
    fontSize: 'md',
    my: '1',
});

const xl = defineStyle({
    fontSize: 'md',
    width: '280px',
});

const sm = defineStyle({
    fontSize: 'sm',
    my: '0',
    borderRadius: 'lg',
    py:'2'
});



const sizes = {
    xl: definePartsStyle({
        item: xl,
        groupTitle: xl,
        command: xl,
    }),
    lg: definePartsStyle({
        item: lg,
        groupTitle: lg,
        command: lg,
    }),
    sm: definePartsStyle({
        item: sm,
        list: {
            minW: '180px',

            borderRadius: 'xl',
        },
        groupTitle: sm,
        command: sm,
    }),

};

// define custom variants

// export the component theme
export const menuTheme = defineMultiStyleConfig({
    baseStyle,
    sizes,
    defaultProps: {
        size: 'lg',
    },
});
