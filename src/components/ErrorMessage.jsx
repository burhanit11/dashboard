function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3 text-center">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-lg">
        !
      </div>
      <p className="text-sm text-slate-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 text-sm bg-[#1a8cff] text-white rounded-lg border-none cursor-pointer hover:bg-[#0066dd] transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
