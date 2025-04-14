import { HeroSlide } from "@/types/type";

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
    image: "/h1.png",
    cta: "Browse Collection",
  },
  {
    id: 2,
    title: "Summer Reading Challenge",
    description: "Join our summer reading challenge and win exciting prizes",
    image: "/h2.png",
    cta: "Join Challenge",
  },
  {
    id: 3,
    title: "New Releases Every Week",
    description:
      "Stay updated with the latest books from your favorite authors",
    image: "/h3.png",
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
export const testimonials = [
  {
    name: "Alex Johnson",
    role: "Avid Reader",
    content:
      "This platform has transformed my reading experience. The recommendations are spot-on, and I love how easy it is to track my progress.",
    avatar: "/placeholder.svg?height=60&width=60&text=AJ",
    rating: 5,
  },
  {
    name: "Samantha Lee",
    role: "Book Club Organizer",
    content:
      "Managing my book club has never been easier. The discussion tools and scheduling features save me hours every month.",
    avatar: "/placeholder.svg?height=60&width=60&text=SL",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Literature Professor",
    content:
      "I recommend this platform to all my students. The annotation features and reading analytics help them engage more deeply with texts.",
    avatar: "/placeholder.svg?height=60&width=60&text=MC",
    rating: 4,
  },
]