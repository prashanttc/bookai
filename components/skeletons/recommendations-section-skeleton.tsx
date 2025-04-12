import { Skeleton } from "@/components/ui/skeleton"

export function RecommendationsSectionSkeleton() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/20 border border-secondary flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />
          <Skeleton className="h-10 w-48 rounded-md" />
        </div>
        <div className="md:w-2/3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton className="w-16 h-24 md:w-20 md:h-30 mb-2 rounded" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
