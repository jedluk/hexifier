import { ViewState } from 'react-map-gl'

export const CENTER_OF_EUROPE: Omit<ViewState, 'padding'> = {
  latitude: 50,
  longitude: 15,
  zoom: 4,
  bearing: 0,
  pitch: 0
}
