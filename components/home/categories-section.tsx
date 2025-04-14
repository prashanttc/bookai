import { Card, CardContent } from "@/components/ui/card"
import type { Categoryy } from "@/types/type"

interface CategoriesSectionProps {
  categories: Categoryy[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Browse Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.name}
            className={`group hover:shadow-md transition-all duration-300 cursor-pointer border-2 ${category.color} hover:scale-[1.02]`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${category.iconColor} bg-white border-2 ${category.color.replace("bg-", "border-")} text-2xl group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-xs font-medium bg-background rounded-full px-2 py-1 group-hover:bg-primary group-hover:text-white transition-colors">
                      {category.count} books
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
