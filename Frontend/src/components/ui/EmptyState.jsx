const EmptyState = ({ title = "No results yet", description = "There is nothing to show here.", children, }) => {
    return (
        <div className="rounded border border-slate-200 bg-slate-50 p-8 text-center text-slate-700">
            <p className="text-2xl font-semibold">{title}</p>
            <p className="mt-2 text-slate-500">{description}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default EmptyState;
