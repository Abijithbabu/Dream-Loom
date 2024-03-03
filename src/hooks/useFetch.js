import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const useFetch = (endpoint, query, method = 'GET') => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const options = {
        method: method,
        url: `${process.env.REACT_APP_BASE_URL}${endpoint}`,
        data: {
            prompt: query.prompt
        }
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const res = await axios.request(options)
            dispatch({ type: 'story', payload: res?.data })
            setData(res?.data)
            setIsLoading(false)
        } catch (error) {
            alert(error)
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { data, isLoading, error, fetchData }
}

export default useFetch