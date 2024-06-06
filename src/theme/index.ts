import { extendTheme } from '@chakra-ui/react';

export const Theme = extendTheme({
  fonts: {
    heading: 'Work Sans, "LXGW WenKai Lite", sans-serif',
    body: 'Work Sans, "LXGW WenKai Lite", sans-serif',
  },
  styles: {
    global: {
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      
      '::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgb(205, 205, 205)',
      },
      
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgb(166, 166, 166)',
      },
      
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'dark',
      },
    }
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'blue.500',
        _dark: 'blue.200',
      }
    }
  }
})