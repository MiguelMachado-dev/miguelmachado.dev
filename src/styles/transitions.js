// Enhanced animation timing functions
const defaultTiming = '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Ease-out-quad for smooth animations
const fastTiming = '0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const slowTiming = '0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

// Base transitions
const bgTransition = `background-color ${defaultTiming}`
const colorTransition = `color ${defaultTiming}`
const transformTransition = `transform ${defaultTiming}`
const boxShadowTransition = `box-shadow ${defaultTiming}`
const borderTransition = `border ${defaultTiming}`
const opacityTransition = `opacity ${fastTiming}`

// Combined transitions
const defaultTransition = `${bgTransition}, ${colorTransition}`
const hoverTransition = `${colorTransition}, ${transformTransition}, ${boxShadowTransition}`
const fullTransition = `${defaultTransition}, ${transformTransition}, ${boxShadowTransition}, ${borderTransition}, ${opacityTransition}`

const transitions = {
  DEFAULT: defaultTransition,
  COLOR: colorTransition,
  BACKGROUND: bgTransition,
  TRANSFORM: transformTransition,
  SHADOW: boxShadowTransition,
  HOVER: hoverTransition,
  OPACITY: opacityTransition,
  ALL: fullTransition,
  FAST: fastTiming,
  SLOW: slowTiming
}

export default transitions
