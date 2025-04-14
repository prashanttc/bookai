"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Sparkles, BookText } from "lucide-react"

interface AnimatedLoadingPageAltProps {
  onLoadingComplete?: () => void
  minimumLoadingTime?: number
}

export default function Loading({
  onLoadingComplete,
  minimumLoadingTime = 3000,
}: AnimatedLoadingPageAltProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [bookIndex, setBookIndex] = useState(0)
  const startTimeRef = useRef(Date.now())

  const bookColors = [
    "#FCD34D", // Yellow
    "#F87171", // Red
    "#60A5FA", // Blue
    "#34D399", // Green
    "#A78BFA", // Purple
  ]

  const loadingMessages = [
    "Dusting off the bookshelves",
    "Brewing coffee for your reading session",
    "Arranging books by color... then by author",
    "Bookmarking your favorites",
    "Preparing your literary journey",
  ]

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.05
        return newProgress > 99 ? 100 : newProgress
      })
    }, 100)

    // Rotate books
    const bookInterval = setInterval(() => {
      setBookIndex((prev) => (prev + 1) % bookColors.length)
    }, 2000)

    // Handle completion
    const completionTimer = setTimeout(() => {
      const elapsedTime = Date.now() - startTimeRef.current

      if (elapsedTime < minimumLoadingTime) {
        setTimeout(() => {
          setIsVisible(false)
          if (onLoadingComplete) onLoadingComplete()
        }, minimumLoadingTime - elapsedTime)
      } else {
        setIsVisible(false)
        if (onLoadingComplete) onLoadingComplete()
      }
    }, minimumLoadingTime)

    return () => {
      clearInterval(progressInterval)
      clearInterval(bookInterval)
      clearTimeout(completionTimer)
    }
  }, [minimumLoadingTime, onLoadingComplete, bookColors.length])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-background/95 to-secondary/20 backdrop-blur-sm overflow-hidden"
        >
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [null, "-100vh"],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {i % 3 === 0 ? (
                  <BookOpen className="text-primary/20 h-5 w-5" />
                ) : i % 3 === 1 ? (
                  <Sparkles className="text-primary/20 h-5 w-5" />
                ) : (
                  <BookText className="text-primary/20 h-5 w-5" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="w-full max-w-md px-6 flex flex-col items-center relative z-10">
            {/* 3D Book Stack */}
            <div className="relative h-48 w-48 mb-12">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  initial={{
                    x: "-50%",
                    y: "-50%",
                    rotateX: 60,
                    rotateZ: -10,
                    translateZ: -i * 10,
                  }}
                  animate={{
                    translateY: [0, -10, 0],
                    translateZ: [-i * 10, -i * 10 - 5, -i * 10],
                    rotateZ: [-10, -8, -10],
                    scale: i === bookIndex ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="w-32 h-44 rounded-md shadow-lg flex items-center justify-center text-white font-bold"
                    style={{
                      background: bookColors[i % bookColors.length],
                      boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1)`,
                      transform: "rotateX(0deg) rotateY(0deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)`,
                      }}
                    />
                    <div className="relative z-10 transform -rotate-90 text-lg tracking-wider">
                      {["NOVEL", "POETRY", "HISTORY", "SCIENCE", "FANTASY"][i]}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Sparkles */}
              <motion.div
                className="absolute -top-4 -right-4 text-yellow-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              BookVerse
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center mb-8 h-6"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={bookIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground"
                >
                  {loadingMessages[bookIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Gradient progress bar */}
            <div className="w-full max-w-xs bg-background/50 backdrop-blur-sm rounded-full h-2 mb-2 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full"
                style={{
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              />
            </div>

            <div className="flex justify-between w-full max-w-xs text-xs text-muted-foreground">
              <span>Preparing your experience</span>
              <span>{Math.round(progress)}%</span>
            </div>

            {/* Page turning animation */}
            <div className="mt-12 relative w-16 h-16">
              <motion.div
                className="absolute inset-0 bg-background rounded-r-md shadow-md"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: [0.4, 0, 0.6, 1],
                  repeatDelay: 0.5,
                }}
                style={{
                  transformOrigin: "left center",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(to right, #f3f4f6, #ffffff)",
                }}
              />
              <div
                className="absolute inset-0 rounded-l-md"
                style={{
                  background: "#e5e7eb",
                  borderRight: "1px solid rgba(0,0,0,0.1)",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-background rounded-r-md shadow-md"
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: [0.4, 0, 0.6, 1],
                  repeatDelay: 0.5,
                }}
                style={{
                  transformOrigin: "left center",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(to right, #f3f4f6, #ffffff)",
                }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-6 text-xs text-muted-foreground"
          >
            © 2025 BookVerse. All rights reserved.
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
