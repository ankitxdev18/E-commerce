import { lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfinite from "../utils/useInfinite";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const Products = () => {
    const { products, hasMore, status, error, fetchLazyProducts } = useInfinite();

    if (status === "loading" && products.length === 0) {
        return <Loader message="Loading products..." />;
    }

    if (status === "failed") {
        return <ErrorState message={error || "Unable to load products."} />;
    }

    if (products.length === 0) {
        return (
            <EmptyState
                title="No products available"
                description="There are no products to display at this time."
            />
        );
    }

    return (
        <InfiniteScroll
            dataLength={products.length}
            next={fetchLazyProducts}
            hasMore={hasMore}
            loader={<Loader message="Loading more products..." />}
            endMessage={
                <p className="text-center py-8 text-slate-500">
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="w-full flex flex-wrap ">
                {products.map((p) => (
                    <Suspense key={p.id} fallback={<Loader message="Loading product..." />}>
                        <ProductTemplate p={p} />
                    </Suspense>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default Products;
