function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div
        className={`${sizes[size]} border-[#1a8cff] border-t-transparent rounded-full animate-spin`}
      />
    </div>
  )
}

export default LoadingSpinner
