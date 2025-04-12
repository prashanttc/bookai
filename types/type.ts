export interface User {
    id: string
    name: string
    email: string
    userEmbedding?: UserEmbedding
    savedBooks: SavedBook[]
    interactions: UserBookInteraction[]
  }
  
  export interface Book {
    id: string
    title: string
    description: string
    pageCount: number|null
    coverUrl: string
    previewLink: string|null
    aiSummary: string |null
    aiQuestions: string[]
    aiThemes: string[]
    rating: number
    ratingCount: number
    views: number
    upvotes: number
    createdAt: Date // or Date
    googleBookId: string|null
    publishDate: string|null
    publisher: string|null
    authors: Author[]
    categories: Category[]
  }
  
  export interface Author {
    id: string
    name: string

  }
  
  export interface Category {
    id: string
    name: string

  }
  
  export interface SavedBook {
    id: string
    userId: string
    bookId: string
    createdAt: string // or Date
    book: Book
    user: User
  }
  
  export interface UserBookInteraction {
    id: string
    userId: string
    bookId: string
    timestamp: string // or Date
    saved: boolean
    upvoted: boolean
    viewed: boolean
    book: Book
    user: User
  }
  
  export interface BookEmbedding {
    bookId: string
    vector?: string
    Book: Book
  }
  
  export interface UserEmbedding {
    userId: string
    user: User
    embedding: string
  }
  
export interface Categoryy {
  name: string
  count: number
  icon: string
  color: string
  iconColor: string
  description: string
}

export interface HeroSlide {
  id: number
  title: string
  description: string
  image: string
  cta: string
}
