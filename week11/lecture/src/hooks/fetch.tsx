import { useEffect, useRef, useState } from "react"

type FetchProps = {
  url: string
}
export const useFetch = ({ url }: FetchProps) => {
  const isDevRerender = useRef(true)
  const [data, setData] = useState<any>(null)
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isDevRerender.current) return;

    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true)
    const load = async () => {
      const response = await fetch(url, { signal })
      setIsLoading(false)

      if (!response.ok) {
        const errorText = `Failed to fetch: ${response.statusText}`
        console.error(errorText);
        setError(errorText)
        return;
      }

      setData(await response.json())
    }
    load()

    return () => {
      controller.abort('Component unmounted, aborting fetch');
    }
  }, [url])

  useEffect(() => {
    isDevRerender.current = false
  }, [])

  return { data, loading, error }
}