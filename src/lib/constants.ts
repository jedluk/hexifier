import { ViewState } from 'react-map-gl'

import { matchMedia } from '../globals'

export const CENTER_OF_EUROPE: Omit<ViewState, 'padding'> = {
  bearing: 0,
  latitude: 50,
  longitude: 15,
  pitch: 0,
  zoom: 4
}

const SMALL_SCREEN_MAP_PADDING = {
  bottom: 10,
  left: 10,
  right: 10,
  top: 50
} as const

const MEDIUM_SCREEN_MAP_PADDING = {
  bottom: 10,
  left: 380,
  right: 10,
  top: 40
} as const

type MapPadding =
  | typeof SMALL_SCREEN_MAP_PADDING
  | typeof MEDIUM_SCREEN_MAP_PADDING

export function isMobileScreen(): boolean {
  return matchMedia('(max-width: 768px)').matches
}

export function getSidebarRatio(isPanelOpen: boolean): number {
  if (isMobileScreen()) {
    return 0
  }
  return (
    (Number(isPanelOpen) / window.innerWidth) * MEDIUM_SCREEN_MAP_PADDING.left
  )
}

export function getTopBarRatio(): number {
  if (!isMobileScreen()) {
    return 0
  }
  return SMALL_SCREEN_MAP_PADDING.top / window.innerHeight
}

export function getMapPadding(): MapPadding {
  return isMobileScreen() ? SMALL_SCREEN_MAP_PADDING : MEDIUM_SCREEN_MAP_PADDING
}

export const HEX_AREA_SQUARE_KM = Object.freeze({
  '0': 4_357_449.416078381,
  '1': 609_788.441794133,
  '2': 86_801.780398997,
  '3': 12_393.434655088,
  '4': 1_770.347654491,
  '5': 252.903858182,
  '6': 36.129062164,
  '7': 5.16129336,
  '8': 0.737327598,
  '9': 0.105332513,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  '10': 0.015047502,
  '11': 0.002149643,
  '12': 0.000307092,
  '13': 0.00004387,
  '14': 0.000006267,
  '15': 0.000000895
})

export const KEYBOARD_KEYS = {
  enter: 'Enter',
  space: ' '
}
