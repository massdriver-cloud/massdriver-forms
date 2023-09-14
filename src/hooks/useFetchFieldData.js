import { useState, useEffect } from 'react'

const useFetchFieldData = ({ fetch, format }, serviceName) => {
  const [data, setData] = useState(null)
  const [response, setResponse] = useState(null)
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
  }, [])

  const fetchData = {
    data,
    loading,
    error,
    response
  }

  const formattedFetchData = format ? format(fetchData) : fetchData

  formattedFetchData?.error?.messages?.forEach(message => console.error(`@massdriver/forms - ${serviceName} service error - ${message}`))

  return {
    data: formattedFetchData?.data,
    loading: formattedFetchData?.loading,
    error: formattedFetchData?.error,
    response: formattedFetchData?.response
  }
}

export default useFetchFieldData
