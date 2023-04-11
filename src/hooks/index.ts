
import { useDataStore } from '@/state/data';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useInit = () => {
    const initData = useDataStore(state => state.init)
    const { restoId } = useParams()
    useEffect(() => {
        if (restoId)
            initData(restoId, () => { })
    }, [initData, restoId])
}
