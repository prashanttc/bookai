import { Skeleton } from "@/components/ui/skeleton"

export function HeroSectionSkeleton() {
  return (
    <section className="relative">
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="px-6 md:px-10 max-w-xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-6" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className={`h-2 ${i === 1 ? "w-6" : "w-2"} rounded-full`} />
          ))}
        </div>
      </div>
    </section>
  )
}
