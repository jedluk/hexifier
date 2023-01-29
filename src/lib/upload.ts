import { GeoPolygon, GeoPolygonCollection, JSObject, Maybe } from '../types'
import { isNotNull, isNull, isNumber, isObject } from '.'

export function isSingleJSONFile(files: Maybe<FileList>): files is FileList {
  return (
    isNotNull(files) &&
    files.length === 1 &&
    (files[0].name.endsWith('.json') || files[0].name.endsWith('.geojson'))
  )
}

function isPolygonFeature(blob: JSObject | GeoPolygon): blob is GeoPolygon {
  return (
    isObject(blob) &&
    blob.type === 'Feature' &&
    isObject(blob.properties) &&
    isObject(blob.geometry) &&
    (blob.geometry as JSObject).type === 'Polygon' &&
    Array.isArray((blob.geometry as JSObject).coordinates) &&
    ((blob.geometry as JSObject).coordinates as Array<unknown>).every(
      (chunk: unknown) =>
        Array.isArray(chunk) &&
        chunk.every(([x, y]) => isNumber(x) && isNumber(y))
    )
  )
}

function isPolygonCollection(blob: JSObject): blob is GeoPolygonCollection {
  return (
    isObject(blob) &&
    blob.type === 'FeatureCollection' &&
    Array.isArray(blob.features) &&
    blob.features.every(isPolygonFeature)
  )
}

export function isValidGeoJSON(file: File): Promise<GeoPolygon[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (evt) {
      const { target } = evt

      if (isNull(target) || isNull(target.result)) {
        reject('Cannot read from a file.')
        return
      }

      let content: JSObject = {}

      try {
        content = JSON.parse(target.result.toString()) as JSObject
      } catch (_) {
        reject('Cannot parse file content.')
        return
      }

      if (isPolygonFeature(content)) {
        resolve([content])
      } else if (isPolygonCollection(content)) {
        resolve(content.features)
      } else {
        reject('Not a valid GeoJSON or unsupported features included.')
      }
    }

    reader.onerror = function () {
      reject('Error while processing a file.')
    }

    reader.readAsText(file, 'UTF-8')
  })
}
