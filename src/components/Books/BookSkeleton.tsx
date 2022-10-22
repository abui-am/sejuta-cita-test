import React from 'react';

function BookSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative rounded-lg overflow-hidden mb-2">
        <div className="aspect-3/4 w-full bg-slate-900 bg-opacity-10" />
      </div>
      <div className="h-6 w-full bg-slate-900 bg-opacity-10 rounded-lg mb-2" />
      <div className="h-5 w-[60%] bg-slate-900 bg-opacity-10 rounded-lg mb-2" />
      <div className="h-5 w-full bg-slate-900 bg-opacity-10 rounded-lg" />
    </div>
  );
}

export default BookSkeleton;
