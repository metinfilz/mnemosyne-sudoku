import { useState, useEffect, useCallback } from 'react';
import readFromFile from '../utils/readFromFile';

export default function useGameFetch(index = 0) {
    const [finish, setFinish] = useState(false)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])

    const request = useCallback(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1))
        await setLoading(true);
        let res = await readFromFile(index, 10)
        if (res.length === 0 && !finish) setFinish(true)
        await setList((prev) => prev.concat(res))
        await setLoading(false);
    }, [index, finish]);

    useEffect(() => {
        request().then()
    }, [request, index, finish]);

    return { finish, loading, list };
}
