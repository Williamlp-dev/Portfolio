"use client"

import Link from "next/link"
import { Menu, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { MobileNavigation } from "@/components/navegation/MobileNavigation"
import { useCommandStore } from "@/lib/store/commandStore"
import { useIsMobile } from "@/hooks/useIsMobile"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/Language/language-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isMobile } = useIsMobile()
  const { openCommandMenu } = useCommandStore()
  const { toggleLanguage, language, t } = useLanguage()
  
  const { scrollY } = useScroll()
  const headerBgOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const headerBlur = useTransform(scrollY, [0, 50], [0, 12])
  const headerBorderOpacity = useTransform(scrollY, [0, 50], [0, 0.15])
  const headerPadding = useTransform(scrollY, [0, 50], [20, 12])
  const headerShadow = useTransform(
    scrollY, 
    [0, 50], 
    ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 20px rgba(0, 0, 0, 0.08)"]
  )
  
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  }

  // Language toggle animation
  const flagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } }
  }
  
  return (
    <TooltipProvider>
      <motion.header
        className="fixed top-0 left-0 right-0 w-full z-50"
        style={{
          backgroundColor: mounted ? `rgba(var(--background-rgb), ${headerBgOpacity.get()})` : 'transparent',
          backdropFilter: `blur(${headerBlur.get()}px)`,
          borderBottom: `1px solid rgba(var(--primary-rgb), ${headerBorderOpacity.get()})`,
          padding: `${headerPadding.get()}px 0`,
          boxShadow: headerShadow.get()
        }}
        animate={{
          backgroundColor: scrolled 
            ? "var(--background)" 
            : "rgba(var(--background-rgb), 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0, 0, 0, 0.08)"
            : "none",
          borderBottom: scrolled
            ? "1px solid rgba(var(--primary-rgb), 0.15)"
            : "none",
          paddingTop: scrolled ? "0.75rem" : "1.25rem",
          paddingBottom: scrolled ? "0.75rem" : "1.25rem"
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-300">William</h1>
            </Link>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-3"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    className="relative rounded-full w-10 h-10 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    aria-label={`Change language to ${language === 'pt' ? 'English' : 'Portuguese'}`}
                  >
                    <Globe className="h-5 w-5" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={language}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={flagVariants}
                        className="absolute -top-1 -right-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {language === 'pt' ? 'PT' : 'EN'}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("language.switch")}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ThemeToggle />
            </motion.div>
            
            {!isMobile && (
              <motion.div variants={itemVariants}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={openCommandMenu}
                      className="hidden md:flex rounded-full w-10 h-10 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t("button.press")} <kbd className="px-1 py-0.5 text-xs  border rounded bg-muted text-primary shadow-xs hover:bg-destructive/90">⌘</kbd>
                      <kbd className="px-1 py-0.5 text-xs border rounded bg-muted text-primary shadow-xs hover:bg-destructive/90">K</kbd>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            )}
            
            <motion.div variants={itemVariants}>
              <MobileNavigation />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.header>
    </TooltipProvider>
  )
}