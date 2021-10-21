import { transparentize } from 'polished'
import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle, css, DefaultTheme } from 'styled-components'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 600,
  upToSmall: 900,
  upToMedium: 1200,
  upToLarge: 1536
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export const colors: Colors = {
  // base
  white,
  black,

  // text
  text1: '#FFFFFF',
  text2: '#CCCCCC',
  text3: '#999999',
  text4: '#727272',
  text5: '#333333',

  // backgrounds / greys
  bg1: '#000000',
  bg2: '#191919',
  bg3: '#252525',
  bg4: '#303030',
  bg5: '#A1A1A1',

  //specialty colors
  modalBG: 'rgba(0,0,0,.7)',
  advancedBG: 'rgba(0,0,0,0.1)',

  //primary colors
  primary1: '#9867FF',
  primary2: '#9867FF',
  primary3: '#7433FF',
  primary4: '#3E276B',
  primary5: '#2E2247',

  // color text
  primaryText1: '#9867FF',

  // secondary colors
  secondary1: '#3E276B',
  secondary2: '#211735',
  secondary3: '#1D152D',

  // other
  red1: '#F53030',
  green1: '#2DAB50',

  translucent: 'rgba(255, 255, 255, 0.08)',
  gradient1:
    '#000000 linear-gradient(283.31deg, rgba(255, 255, 255, 0.18) -2.53%, rgba(255, 255, 255, 0.17) 18.66%, rgba(255, 255, 255, 0) 98.68%)',
  gradient2: '#000000 linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)'
}

export function theme(): DefaultTheme {
  return {
    ...colors,

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: '#000',

    // media queries
    mediaWidth: mediaWidthTemplates,

    //rwd
    mobile: css`
      display: none;
      ${mediaWidthTemplates.upToSmall`display:inherit;`}
    `,
    desktop: css`
      ${mediaWidthTemplates.upToSmall`display:none;`}
    `,
    mobileHeaderHeight: '90px',
    headerHeight: '82px',

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Roboto', sans-serif;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Roboto', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: #ffffff;
  background-color: ${({ theme }) => theme.bg2};
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
      1,
      theme.bg1
    )} 100%)`};
}
`