import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function FeaturedBooksSectionSkeleton() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full overflow-hidden">
            <div className="relative">
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
            <CardContent className="p-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-2/3 mb-2" />
              <div className="mt-1.5 flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Skeleton key={star} className="h-3 w-3 rounded-full mr-0.5" />
                  ))}
                </div>
                <Skeleton className="h-3 w-8 ml-1" />
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between items-center">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-7 w-16 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
