"use client"

import Image from "next/image"
import { ArrowBigRightDash, Bookmark, BookmarkCheck, Heart, SaveAllIcon, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Book } from "@/types/type"
import Link from "next/link"

interface BookPreviewDialogProps {
  book: Book | null
  isSaved: boolean
  onClose: () => void
  onSave: (id: string) => void
}

export function BookPreviewDialog({ book, isSaved, onClose, onSave }: BookPreviewDialogProps) {
  if (!book) return null

  return (
    <Dialog open={!!book} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>By {book.authors.map((author)=>author.name)}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[120px_1fr] gap-6 py-4">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div>
            {/* <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(book.rating) ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{book.rating}</span>
            </div> */}
            <p className="text-sm text-muted-foreground mb-4">{book.description || "No description available."}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {/* <div>
                <p className="font-medium">Price</p>
                <p>${book.price}</p>
              </div> */}
              {book.pageCount && (
                <div>
                  <p className="font-medium">Pages</p>
                  <p>{book.pageCount}</p>
                </div>
              )}
              {book.publishDate && (
                <div>
                  <p className="font-medium">Published</p>
                  <p>{book.publishDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between gap-2">
          <Button variant="outline" className="gap-2" onClick={() => onSave(book.id)}>
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 fill-red-500 text-red-500" />
                <span>saved</span>
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                <span>save</span>
              </>
            )}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              className="gap-2 flex items-center"
              onClick={() => {
                onClose()
              }}
            >
       {book.previewLink?(
              <Link href={book.previewLink} target="_blank" className="flex items-center gap-2">
              <ArrowBigRightDash className="h-4 w-4" />
              <span>view goolge book preview</span></Link>
       ):(
   <>
        <ArrowBigRightDash className="h-4 w-4" />
        <span>view goolge book preview</span></>
       )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
