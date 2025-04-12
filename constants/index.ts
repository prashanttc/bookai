import { HeroSlide } from "@/types/type";

export const sideabarContent = [
  {
    title: "Home",
    link: "/dashboard",
    src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGQ9Ik0gMjMuOTUxMTcyIDQgQSAxLjUwMDE1IDEuNTAwMTUgMCAwIDAgMjMuMDcyMjY2IDQuMzIyMjY1NiBMIDguODU5Mzc1IDE1LjUxOTUzMSBDIDcuMDU1NDc3MiAxNi45NDExNjMgNiAxOS4xMTM1MDYgNiAyMS40MTAxNTYgTCA2IDQwLjUgQyA2IDQxLjg2MzU5NCA3LjEzNjQwNTggNDMgOC41IDQzIEwgMTguNSA0MyBDIDE5Ljg2MzU5NCA0MyAyMSA0MS44NjM1OTQgMjEgNDAuNSBMIDIxIDMwLjUgQyAyMSAzMC4yMDQ5NTUgMjEuMjA0OTU1IDMwIDIxLjUgMzAgTCAyNi41IDMwIEMgMjYuNzk1MDQ1IDMwIDI3IDMwLjIwNDk1NSAyNyAzMC41IEwgMjcgNDAuNSBDIDI3IDQxLjg2MzU5NCAyOC4xMzY0MDYgNDMgMjkuNSA0MyBMIDM5LjUgNDMgQyA0MC44NjM1OTQgNDMgNDIgNDEuODYzNTk0IDQyIDQwLjUgTCA0MiAyMS40MTAxNTYgQyA0MiAxOS4xMTM1MDYgNDAuOTQ0NTIzIDE2Ljk0MTE2MyAzOS4xNDA2MjUgMTUuNTE5NTMxIEwgMjQuOTI3NzM0IDQuMzIyMjY1NiBBIDEuNTAwMTUgMS41MDAxNSAwIDAgMCAyMy45NTExNzIgNCB6IE0gMjQgNy40MTAxNTYyIEwgMzcuMjg1MTU2IDE3Ljg3Njk1MyBDIDM4LjM2OTI1OCAxOC43MzEzMjIgMzkgMjAuMDMwODA3IDM5IDIxLjQxMDE1NiBMIDM5IDQwIEwgMzAgNDAgTCAzMCAzMC41IEMgMzAgMjguNTg1MDQ1IDI4LjQxNDk1NSAyNyAyNi41IDI3IEwgMjEuNSAyNyBDIDE5LjU4NTA0NSAyNyAxOCAyOC41ODUwNDUgMTggMzAuNSBMIDE4IDQwIEwgOSA0MCBMIDkgMjEuNDEwMTU2IEMgOSAyMC4wMzA4MDcgOS42MzA3NDEyIDE4LjczMTMyMiAxMC43MTQ4NDQgMTcuODc2OTUzIEwgMjQgNy40MTAxNTYyIHoiLz48L3N2Zz4=",
  },
  {
    title: "Liked books",
    link: "/liked-books",
    src: "",
  },
  {
    title: "discover",
    link: "/discover",
    src: "",
  },
];
export const categories = [
  {
    name: "Fiction",
    count: 1254,
    icon: "📚",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-500",
    description: "Explore imaginative worlds and compelling stories",
  },
  {
    name: "Science Fiction",
    count: 867,
    icon: "🚀",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-500",
    description: "Journey to the future and beyond",
  },
  {
    name: "Mystery",
    count: 932,
    icon: "🔍",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    description: "Solve puzzling cases and thrilling suspense",
  },
  {
    name: "Biography",
    count: 427,
    icon: "👤",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-500",
    description: "Real stories of extraordinary lives",
  },
  {
    name: "History",
    count: 568,
    icon: "🏛️",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    description: "Discover the events that shaped our world",
  },
  {
    name: "Self-Help",
    count: 312,
    icon: "🧠",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-500",
    description: "Improve yourself and reach your potential",
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Discover Your Next Favorite Book",
    description: "Explore our vast collection of books across all genres",
    image: "/placeholder.svg?height=400&width=1200",
    cta: "Browse Collection",
  },
  {
    id: 2,
    title: "Summer Reading Challenge",
    description: "Join our summer reading challenge and win exciting prizes",
    image: "/placeholder.svg?height=400&width=1200",
    cta: "Join Challenge",
  },
  {
    id: 3,
    title: "New Releases Every Week",
    description:
      "Stay updated with the latest books from your favorite authors",
    image: "/placeholder.svg?height=400&width=1200",
    cta: "See New Releases",
  },
];

export const genres = [
  "All","Fiction", "Non-fiction", "Science", "Technology",
  "Business", "History", "Self-improvement", "Philosophy",
  "Psychology", "Health", "Biography", "Education", "Fantasy",
  "Thriller", "Romance", "Spirituality", "Politics", "Art",
  "Mathematics", "Environment"
];
export const sortOptions = ["Relevance",'Title', "Popularity", "Rating"];