import * as React from 'react'

/**
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param callback
 * @param delay
 */

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback)

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
