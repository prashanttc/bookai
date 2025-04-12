"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-amber-50">
      <div className="relative mb-8 h-32 w-32">
        {/* Book cover */}
        <motion.div
          className="absolute inset-0 rounded-r-md bg-emerald-700"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 180 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Book pages */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 origin-left rounded-r-sm bg-amber-100"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 1.5,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Book back cover */}
        <motion.div
          className="absolute inset-0 rounded-r-md bg-emerald-800"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 180 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 1.5,
            delay: 0.6,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-2xl font-serif font-medium text-emerald-900">Turning Pages</h2>
        <p className="text-sm text-emerald-700">Your literary journey is loading...</p>
      </motion.div>

      {/* Loading progress bar */}
      <motion.div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-emerald-100">
        <motion.div
          className="h-full bg-emerald-600"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
