"use client";

export function SectionSkeleton() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="h-3 w-40 bg-[#111E30] rounded mb-3" />
          <div className="h-8 w-64 bg-[#111E30] rounded mb-2" />
          <div className="h-4 w-80 bg-[#111E30] rounded" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6">
              <div className="w-11 h-11 rounded-[12px] bg-[#111E30] mb-4" />
              <div className="h-4 w-32 bg-[#111E30] rounded mb-2" />
              <div className="h-3 w-full bg-[#111E30] rounded mb-1.5" />
              <div className="h-3 w-3/4 bg-[#111E30] rounded mb-3" />
              <div className="h-5 w-24 bg-[#111E30] rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 animate-pulse">
      <div className="w-11 h-11 rounded-[12px] bg-[#111E30] mb-4" />
      <div className="h-4 w-32 bg-[#111E30] rounded mb-2" />
      <div className="h-3 w-full bg-[#111E30] rounded mb-1.5" />
      <div className="h-3 w-3/4 bg-[#111E30] rounded" />
    </div>
  );
}
