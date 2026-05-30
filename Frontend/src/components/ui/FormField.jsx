const FormField = ({
    name,
    label,
    register,
    rules,
    type = "text",
    placeholder,
    error,
}) => {
    return (
        <div className="mb-5">
            {label && <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>}
            {type === "textarea" ? (
                <textarea
                    {...register(name, rules)}
                    className="w-full rounded border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    placeholder={placeholder}
                />
            ) : (
                <input
                    {...register(name, rules)}
                    className="w-full rounded border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    type={type}
                    placeholder={placeholder}
                />
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
    );
};

export default FormField;
