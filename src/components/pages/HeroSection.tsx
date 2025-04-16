"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin, Mail, MoveRight } from "lucide-react"
import Link from "next/link"
import { CommandKButton } from "../navegation/CommandMenuButton"
import { useLanguage } from "@/components/Language/language-provider"

export function Hero() {
  const [typedText, setTypedText] = useState("")
  const { t } = useLanguage()
  const missionText = t("hero.mission")

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < missionText.length) {
        setTypedText(missionText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [missionText])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 scanline" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 z-10 text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-block bg-secondary backdrop-blur-sm border border-primary/30 rounded-md px-4 py-2 mb-8">
            <p className="font-mono text-sm text-primary">
              <span className="mr-2">{">"}</span>
              {typedText}
              <span className="animate-caret-blink">_</span>
            </p>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 glitch-text"
          data-text={t("hero.title")}
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button 
              className="group px-6 py-6 text-base transition-all duration-300 hover:pr-7" 
            >
              {t("hero.cta")}
              <MoveRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
            </Button>

              <CommandKButton />
            
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex items-center justify-center space-x-4"
        >
          <Link href="https://github.com/Williamlp-dev" target="_blank">
            <Button variant="ghost" size="icon" className="rounded h-12 w-12 hover:bg-primary/10 hover:text-primary transition-colors duration-300">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          
          <Link href="https://www.linkedin.com/in/william-lopes-5537792a1/" target="_blank">
            <Button variant="ghost" size="icon" className="rounded h-12 w-12 hover:bg-primary/10 hover:text-primary transition-colors duration-300">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>

          <Link href="" target="_blank">
            <Button variant="ghost" size="icon" className="rounded h-12 w-12 hover:bg-primary/10 hover:text-primary transition-colors duration-300">
              <Mail className="h-5 w-5" />
              <span className="sr-only">(t{"command.contact"})</span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8 text-primary/80" />
        </motion.div>
      </motion.div>
    </section>
  )
}