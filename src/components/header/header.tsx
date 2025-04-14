"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { MobileNavigation } from "@/components/navegation/MobileNavigation"
import { useCommandStore } from "@/lib/store/commandStore"
import { useIsMobile } from "@/hooks/useIsMobile"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isMobile } = useIsMobile()
  const { openCommandMenu } = useCommandStore()
  
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12">
        <Link
          href="/"
          className={`flex items-center transition-all duration-700 ease-out transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h1 className="text-xl font-bold tracking-tight">William</h1>
        </Link>
        
        <div
          className={`flex items-center space-x-4 transition-all duration-700 ease-out transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <ThemeToggle />
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={openCommandMenu}
              className="hidden md:flex rounded-full w-10 h-10 transition-all duration-300 hover:bg-primary/10"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          )}
          
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}
