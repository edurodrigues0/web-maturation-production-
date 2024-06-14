import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '320px',
  md: '568px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      background: '#131515',
      backgroundForeground: '#2B2C28',
      primary: '#339989',
      secondary: '#7DE2D1',
      heading: '#FFFAFB',
      text: 'gray.50',
    },
  },
  styles: {
    global: {
      fonts: {
        heading: 'Roboto',
        body: 'Roboto',
      },
      body: {
        background: 'background',
        color: 'gray.50',
      },
    },
  },
  breakpoints,
})
