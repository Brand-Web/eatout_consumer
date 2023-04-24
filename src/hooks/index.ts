import { useDataStore } from "@/state/data";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useInit = () => {
    const initData = useDataStore((state) => state.init);
    const { restoId,tableId } = useParams();
    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        if (restoId) initData(restoId,tableId?parseInt(tableId):undefined, () => { });
        else
            navigate("/", { replace: true });

    }, [initData, navigate, param, restoId,tableId]);
};
