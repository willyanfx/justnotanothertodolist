import { useEffect, useState } from 'react'

export function useRequiredInput() {
    const [error, setError] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 1000);
    }, [error])
    return { error, setError }
}