import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '320px',
  md: '568px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}


export const theme = extendTheme({
  styles: {
    global: {
      fonts: {
        heading: 'Roboto',
        body: 'Roboto',
      },
      body: {
        background: 'gray.200',
        color: 'gray.700'
      }
    }
  },
  breakpoints,
})