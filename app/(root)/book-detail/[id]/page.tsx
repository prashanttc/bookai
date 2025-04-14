"use client";
import BookDetailPage from "@/pages/book-detail-page"

export default function BookDetail({params}:{params: {id: string}}) {

  return <BookDetailPage bookId={params.id}/>
}
