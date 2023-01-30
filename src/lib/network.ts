import { fetch } from '../globals'

function handleHTTPResponse(response: Response): Promise<Response> {
  if (response.ok) {
    return Promise.resolve(response)
  }

  switch (response.status) {
    case 401:
    case 403:
      return Promise.reject(new Error('Unauthorized'))
    default:
      return response
        .json()
        .then((error: Record<string, unknown>) =>
          Promise.reject(new Error(JSON.stringify(error)))
        )
  }
}

function toJSONType<R>(): (response: Response) => Promise<R> {
  return (response: Response) => response.json().then((json) => json as R)
}

export function enhancedFetch<R>(
  input: RequestInfo,
  init?: RequestInit
): Promise<R> {
  return fetch(input, { ...init })
    .then(handleHTTPResponse)
    .then(toJSONType<R>())
}
