import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function BookCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
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
  )
}
