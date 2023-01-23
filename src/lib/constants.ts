import { ViewState } from 'react-map-gl'

export const CENTER_OF_EUROPE: Omit<ViewState, 'padding'> = {
  bearing: 0,
  latitude: 50,
  longitude: 15,
  pitch: 0,
  zoom: 4
}

export const MAP_PADDING = {
  bottom: 10,
  left: 384,
  right: 10,
  top: 40
} as const

export const HEX_AREAS_SQUARE_KM: Record<number, number> = {
  0: 4_357_449.416078381,
  1: 609_788.441794133,
  2: 86_801.780398997,
  3: 12_393.434655088,
  4: 1_770.347654491,
  5: 252.903858182,
  6: 36.129062164,
  7: 5.16129336,
  8: 0.737327598,
  9: 0.105332513,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  10: 0.015047502,
  11: 0.002149643,
  12: 0.000307092,
  13: 0.00004387,
  14: 0.000006267,
  15: 0.000000895
}

export const KEYBOARD_KEYS = {
  enter: 'Enter',
  space: ' '
}
