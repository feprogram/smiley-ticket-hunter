export const LoadingState = () => {
  return (
    <div className="space-y-4 w-full">
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );
};