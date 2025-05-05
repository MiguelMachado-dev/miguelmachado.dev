import { createGlobalStyle } from 'styled-components'
import media from 'styled-media-query'

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'MonoLisa-Regular';
  src: url('/font/MonoLisa-Regular.ttf')  format('truetype');
}

@font-face {
  font-family: 'MonoLisa-Regular';
  src: url('/font/MonoLisa-RegularItalic.ttf')  format('truetype');
  font-style: italic, oblique;
}

  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  em {
    font-style: italic;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background: var(--background);
    line-height: 1;
    font-size: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  img {
    display: block;
  	width: 100%;
  	height: auto;
  }

  ::selection {
    background-color: rgba(162, 119, 255, 0.3);
    color: var(--postColor);
  }

  /* Updated tech-themed dark mode */
  body.dark {
    --borders: #2a2a3c;
    --texts: #8899a6;
    --postColor: #edecee;
    --highlight: #a277ff;
    --mediumBackground: #110f18;
    --background: #15141b;
    --white: #fff;
    --black: #222;
    --card-bg: rgba(25, 25, 40, 0.5);
    --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    --grid-pattern: rgba(162, 119, 255, 0.03);
  }

  body.light {
    --borders: #c5c5d2;
    --postColor: #222232;
    --texts: #444455;
    --highlight: #e94057;
    --mediumBackground: #f6f7fa;
    --background: #ffffff;
    --white: #ffffff;
    --black: #222232;
    --card-bg: rgba(250, 250, 255, 0.9);
    --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    --grid-pattern: rgba(233, 64, 87, 0.03);
  }

  /* Add tech-themed background pattern overlay */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-image: 
      radial-gradient(circle at 25px 25px, var(--grid-pattern) 2px, transparent 0),
      linear-gradient(to right, var(--grid-pattern) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-pattern) 1px, transparent 1px);
    background-size: 50px 50px, 25px 25px, 25px 25px;
    z-index: -1;
    opacity: 0.4;
  }

  pre code {
    background: inherit !important;
    border-radius: 8px;
  }

  code {
    font-family: 'MonoLisa-Regular', monospace;
  }

  .infinite-scroll-component {
    margin: auto;
    max-width: 70rem;
    padding: 0 4rem;

    ${media.lessThan('large')`
      padding: 0 1rem;
    `}
  }

  /* Smooth transitions between light and dark mode */
  body {
    transition: background-color 0.3s ease;
  }

  a, button {
    transition: all 0.25s ease;
  }
`
export default GlobalStyles
