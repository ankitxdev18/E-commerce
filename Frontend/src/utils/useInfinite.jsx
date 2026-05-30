import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/slices/productSlice";

const useInfinite = () => {
    const dispatch = useDispatch();
    const { items, status, error, hasMore, page } = useSelector((state) => state.productReducer);

    const fetchLazyProducts = useCallback(async () => {
        if (status === "loading" || !hasMore) return;
        await dispatch(loadProducts(page + 1));
    }, [dispatch, hasMore, page, status]);

    useEffect(() => {
        if (items.length === 0 && status === "idle") {
            dispatch(loadProducts(0));
        }
    }, [dispatch, items.length, status]);

    return {
        products: items,
        status,
        error,
        hasMore,
        fetchLazyProducts,
    };
};

export default useInfinite;
