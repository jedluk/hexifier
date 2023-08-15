import { useEffect, useRef } from 'react'

export function useCopyToClipboad(text: string): void {
  const copyText = useRef(text)

  useEffect(() => {
    copyText.current = text
  }, [text])

  useEffect(() => {
    // eslint-disable-next-line func-style
    const handler = (evt: KeyboardEvent): void => {
      if (evt.metaKey && evt.key === 'c') {
        console.log('copied')
        void window.navigator.clipboard.writeText(copyText.current)
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])
}
