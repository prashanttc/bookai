"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, ArrowRight, Star, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { testimonials } from "@/constants"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

 
const session = useSession();
const user = session.data?.user;

  const features = [
    {
      title: "Personalized Recommendations",
      description: "Discover new books tailored to your reading preferences and history.",
      icon: (
        <svg
          className="w-10 h-10 text-main"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Reading Progress Tracker",
      description: "Set goals, track your progress, and visualize your reading journey.",
      icon: (
        <svg
          className="w-10 h-10 text-main"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Virtual Bookshelf",
      description: "Organize your collection and keep track of books you want to read next.",
      icon: (
        <svg
          className="w-10 h-10 text-main"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          ></path>
        </svg>
      ),
    },
    {
      title: "Reading Communities",
      description: "Join book clubs and connect with readers who share your interests.",
      icon: (
        <svg
          className="w-10 h-10 text-main"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
    },
  ]

  const categories = [
    { name: "Fiction", count: 1243, image: "/1.jpg" },
    { name: "Non-Fiction", count: 876, image:"2.jpg" },
    { name: "Mystery", count: 567, image: "/3.webp" },
    { name: "Science Fiction", count: 432, image: "/10.jpeg" },
    { name: "Fantasy", count: 389, image: "/7.jpeg" },
    { name: "Biography", count: 298, image: "/9.jpeg" },
  ] 

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = [heroRef, featuresRef, testimonialsRef, categoriesRef, ctaRef]
      sections.forEach((section) => {
        if (section.current) {
          const rect = section.current.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
            section.current.classList.add("in-view")
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

 const handleLogin =()=>{
    if(user){
      redirect('/home')
    }else{
      signIn('google')
    }
 }
  return (
    <div className="min-h-screen bg-gradient-to-l to-white from-main/50 text-foreground">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrollY > 50 ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-main/10 flex items-center justify-center transition-all duration-300 group-hover:bg-main/20">
              <BookOpen className="h-5 w-5 text-main transition-all duration-300 group-hover:scale-110" />
            </div>
            <span className="text-xl font-medium bg-clip-text text-main">
              Readify
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Books", "Categories", "About"].map((item, i) => (
              <Link
                key={i}
                href="#"
                className="text-foreground/80 hover:text-main transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-main transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">

            <Button className="bg-main hover:bg-main/90 text-white" onClick={()=>signIn('google')}>Sign In</Button>
          </div>

          <button
            className="md:hidden text-foreground/80 hover:text-main transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background flex flex-col p-6 transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-main/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-main" />
            </div>
            <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-main to-main-light">
              Readify
            </span>
          </Link>
          <button
            className="text-foreground/80 hover:text-main transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 text-lg">
          {["Home", "Books", "Categories", "About"].map((item, i) => (
            <Link
              key={i}
              href="#"
              className="text-foreground/80 hover:text-main transition-colors duration-300 py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col space-y-4 pt-8">
         
          <Button className="bg-main hover:bg-main/90 text-white w-full justify-center" onClick={()=>signIn('google')}>Sign in</Button>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 section-animation">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-main/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-main-light/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block animate-fade-in">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-main text-white">
                    Discover your next favorite book
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in animation-delay-100">
                  A <span className="text-main">better way</span> to discover and enjoy books
                </h1>

                <p className="text-lg text-foreground/70 max-w-lg animate-fade-in animation-delay-200">
                  Personalized recommendations, progress tracking, and a community of fellow readers to enhance your
                  reading experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-300">
                  <Button className="bg-main  text-white group relative overflow-hidden" onClick={handleLogin}>
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-main to-main  -light transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                  </Button>

                  <Button variant="outline" className="border-main/20 text-foreground hover:bg-main/10 group">
                    <span className="relative z-10">Explore Library</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-main transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </div>

                <div className="flex items-center space-x-4 animate-fade-in animation-delay-400">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-main/10 border-2 border-background flex items-center justify-center text-xs font-medium"
                      >
<Avatar className="rounded-full">
  <AvatarImage src="https://github.com/shadcn.png" className="rounded-full"/>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-foreground/60">
                    <span className="font-medium text-foreground">2,000+</span> readers joined this month
                  </div>
                </div>
              </div>

              <div className="relative perspective animate-fade-in animation-delay-200">
                <div className="book-container">
                  <div className="book">
                    <div className="book-cover">
                      <Image
                        src="/1.jpg"
                        alt="Featured book"
                        width={400}
                        height={600}
                        className="rounded-lg object-cover shadow-2xl"
                      />
                    </div>
                    <div className="book-page"></div>
                    <div className="book-page"></div>
                    <div className="book-page"></div>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-main/5 rounded-full blur-2xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-main-light/5 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <div className="w-10 h-10 rounded-full border border-main/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-main"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20  relative section-animation">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-main text-white inline-block mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Everything you need for a better reading experience
              </h2>
              <p className="text-lg text-foreground/70">
                Our platform is designed to enhance your reading journey with tools that help you discover, track, and
                connect.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card bg-background border border-border/50 rounded-xl p-6 transition-all duration-300 hover:border-main/20 hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="w-16 h-16 rounded-full bg-main/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-main/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-main transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {/* Categories Section */}
        <section ref={categoriesRef} className="py-20  relative section-animation">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-main text-white inline-block mb-4">
                Explore
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Browse by category</h2>
              <p className="text-lg text-foreground/70">
                Discover books in your favorite genres and explore new reading territories.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-medium">{category.name}</h3>
                    <p className="text-white/70 text-sm">{category.count} books</p>
                  </div>
                  <div className="absolute inset-0 bg-main/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-background border border-main/20 text-main hover:bg-main/10 group">
                <span className="flex items-center">
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-20 relative section-animation"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-background border border-border/50 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-main/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-main-light/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your reading journey?</h2>
                <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Join thousands of readers who have already enhanced their reading experience. Sign up today and get
                  access to all features for free for 30 days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-main hover:bg-main/90 text-white group relative overflow-hidden" onClick={handleLogin}>
                    <span className="relative z-10 flex items-center">
                      Get Started for Free
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-main to-main-light transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                  </Button>

                  <Button variant="outline" className="border-main/20 text-foreground hover:bg-main/10">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className=" border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-main/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-main" />
                </div>
                <span className="text-xl font-medium bg-clip-text text-main">
                  Readify
                </span>
              </Link>
              <p className="text-foreground/60 max-w-xs">
                Enhancing your reading experience with personalized recommendations and community connections.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Explore</h3>
              <ul className="space-y-2">
                {["Books", "Categories", "Authors", "New Releases"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-foreground/60 hover:text-main transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Press", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-foreground/60 hover:text-main transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Accessibility"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-foreground/60 hover:text-main transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Readify. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((item, i) => (
                <Link key={i} href="#" className="text-foreground/60 hover:text-main transition-colors duration-300">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
