import { useState, useEffect } from 'react'

const useFetchFieldData = ({ fetch, format }) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!fetch) return

    const abortController = new AbortController()
    const signal = abortController.signal
    const doFetch = async () => {
      setLoading(true)
      try {
        const res = await fetch()
        setResponse(res)
        const respContent = await res.json()
        if (!signal.aborted) {
          setData(respContent)
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e)
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }
    doFetch()
    return () => {
      abortController.abort()
    }
  }, [skip])


  const { data: formattedData, loading: formattedLoading, error: formattedError } = format ? format({ data, loading, error }) : ({ data, loading, error })



  return { data: formattedData, loading: formattedLoading, error: formattedError }
}

export default useFetchFieldData
