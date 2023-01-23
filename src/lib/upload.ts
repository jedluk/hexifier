import { Maybe } from '../@types'
import { isNotNull } from '.'

export function isSingleGeoJSONFile(files: Maybe<FileList>): files is FileList {
  return (
    isNotNull(files) &&
    files.length === 1 &&
    (files[0].name.endsWith('.json') || files[0].name.endsWith('.geojson'))
  )
}
