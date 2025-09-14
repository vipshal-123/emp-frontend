import { useCallback, useEffect, useState, useRef } from 'react'

interface ApiResponse<T> {
    success: boolean
    data: T[]
    next?: string
}

type ApiFunction<T> = (args: { params?: string | number | object; limit: number; next: string; type?: string }) => Promise<ApiResponse<T>>

interface UseFetchApiOptions {
    params?: string | number | object
    requiresId?: boolean
    type?: string
}

const useFetchApi = <T>(apiFunction: ApiFunction<T>, options?: UseFetchApiOptions) => {
    const [items, setItems] = useState<T[]>([])
    const [cursor, setCursor] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const optionsRef = useRef<UseFetchApiOptions | undefined>(options)

    useEffect(() => {
        optionsRef.current = options
    }, [options])

    const fetchData = useCallback(
        async (currentCursor: string = '') => {
            const currentOptions = optionsRef.current
            if (!currentOptions?.params && currentOptions?.requiresId) {
                return
            }

            setLoading(true)

            try {
                const response = await apiFunction({
                    params: currentOptions?.params ?? '',
                    limit: 10,
                    next: currentCursor,
                    type: currentOptions?.type ?? '',
                })

                if (response?.success) {
                    setItems((prev) => (currentCursor ? [...prev, ...response.data] : response.data))
                    setCursor(response?.next ?? '')
                } else {
                    setItems([])
                }
            } catch (error) {
                console.error('Error:', error)
                setItems([])
            } finally {
                setLoading(false)
            }
        },
        [apiFunction],
    )

    useEffect(() => {
        if (options?.requiresId && !options?.params) {
            return
        }
        fetchData()
    }, [options?.params, fetchData, options?.requiresId])

    const hasMore = !!cursor && items.length > 0

    return {
        items,
        fetchData,
        hasMore,
        cursor,
        setItems,
        loading,
    }
}

export default useFetchApi
