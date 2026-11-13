export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm animate-pulse flex flex-col justify-between">
      <div>
        <div className="h-48 w-full bg-slate-100 rounded-xl mb-4" />
        <div className="h-4 bg-slate-100 rounded w-1/3 mb-2" />
        <div className="h-5 bg-slate-100 rounded w-5/6 mb-1" />
        <div className="h-5 bg-slate-100 rounded w-2/3" />
      </div>
      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="h-6 bg-slate-100 rounded w-20" />
        <div className="h-10 w-10 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
};