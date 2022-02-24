export function ShimmerLoading() {
  return (
    <div className="flex items-center h-20 px-4 duration-100 hover:bg-gray-800 animate-pulse">
      <div className="flex flex-1 items-center">
        <div className="w-16 h-16 relative rounded-xl bg-gray-800" />
        <div className="flex flex-col justify-center h-20 px-4 gap-1">
          <div className="w-40 bg-gray-800 h-6" />
          <div className="w-20 bg-gray-800 h-6" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 p-2 font-bold bg-gray-800 rounded">
        </button>
        <button className="w-8 h-8 p-2 font-bold bg-gray-800 rounded">
        </button>
      </div>
    </div>
  )
}