import { Skeleton } from "@/components/ui/skeleton"

export function TrendingSectionSkeleton() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card/50 backdrop-blur">
            <Skeleton className="w-16 h-24 shrink-0 rounded-md" />
            <div className="flex flex-col flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2 mb-2" />
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Skeleton key={star} className="h-3.5 w-3.5 rounded-full mr-0.5" />
                  ))}
                </div>
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
