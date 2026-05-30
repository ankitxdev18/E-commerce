const ErrorState = ({ message = "Something went wrong." }) => {
    return (
        <div className="rounded border border-red-300 bg-red-50 p-6 text-center text-red-700">
            <p className="font-semibold">Error</p>
            <p className="mt-2">{message}</p>
        </div>
    );
};

export default ErrorState;
