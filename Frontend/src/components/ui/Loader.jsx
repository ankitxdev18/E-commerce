const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="py-10 text-center text-slate-600">
            <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600"></div>
            <p className="mt-4 text-lg">{message}</p>
        </div>
    );
};

export default Loader;
