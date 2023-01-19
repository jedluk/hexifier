const BASE_URL = import.meta.env.BASE_URL

export function serveFromBase(assetName: string) {
  return BASE_URL.endsWith('/')
    ? BASE_URL + assetName
    : [BASE_URL, assetName].join('/')
}
