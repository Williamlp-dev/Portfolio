"use client"

import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Home, User, Code, Briefcase, Github, Linkedin, Mail, Sun, Moon, Laptop, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/Language/language-provider"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const { t, language, toggleLanguage } = useLanguage()
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
                 ('ontouchstart' in window) || 
                 (navigator.maxTouchPoints > 0))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)

  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setOpen(false)
    }
  }
 
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${isMobile ? 'block' : 'hidden'} rounded-full w-10 h-10 transition-all duration-300 hover:bg-primary/10`}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("Open mobile menu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] max-w-[320px] py-8 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground px-4 py-2">{t("command.nav")}</h3>
          
          <Button
            variant="ghost"
            className="justify-start text-base py-6 px-4"
            onClick={() => scrollToSection("hero")}
          >
            <Home className="mr-3 h-5 w-5" />
            {t("nav.home")}
          </Button>
          
          <Button
            variant="ghost"
            className="justify-start text-base py-6 px-4"
            onClick={() => scrollToSection("about")}
          >
            <User className="mr-3 h-5 w-5" />
            {t("nav.about")}
          </Button>
          
          <Button
            variant="ghost"
            className="justify-start text-base py-6 px-4"
            onClick={() => scrollToSection("projects")}
          >
            <Code className="mr-3 h-5 w-5" />
            {t("nav.projects")}
          </Button>
          
          <Button
            variant="ghost"
            className="justify-start text-base py-6 px-4"
            onClick={() => scrollToSection("experience")}
          >
            <Briefcase className="mr-3 h-5 w-5" />
            {t("nav.experience")}
          </Button>
          
          <div className="border-t my-4"> </div>
          
          <h3 className="text-sm font-medium text-muted-foreground px-4 py-2">{t("command.theme")}</h3>
          
          <div className="grid grid-cols-3 gap-2 px-4 py-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="flex flex-col h-auto py-4 gap-1"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-5 w-5" />
              <span className="text-xs">{t("theme.light")}</span>
            </Button>
            
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="flex flex-col h-auto py-4 gap-1"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-5 w-5" />
              <span className="text-xs">{t("theme.dark")}</span>
            </Button>
            
            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="flex flex-col h-auto py-4 gap-1"
              onClick={() => setTheme("system")}
            >
              <Laptop className="h-5 w-5" />
              <span className="text-xs">{t("theme.system")}</span>
            </Button>
          </div>
          
          <div className="border-t my-4"> </div>
          
          <h3 className="text-sm font-medium text-muted-foreground px-4 py-2">Language / Idioma</h3>
          
          <div className="grid grid-cols-2 gap-2 px-4 py-2">
            <Button
              variant={language === "en" ? "default" : "outline"}
              className="flex flex-col h-auto py-4 gap-1"
              onClick={() => toggleLanguage()}
            >
              <Globe className="h-5 w-5" />
              <span className="text-xs">English</span>
            </Button>
            
            <Button
              variant={language === "pt" ? "default" : "outline"}
              className="flex flex-col h-auto py-4 gap-1"
              onClick={() => toggleLanguage()}
            >
              <Globe className="h-5 w-5" />
              <span className="text-xs">Português</span>
            </Button>
          </div>
          
          <div className="border-t my-4"> </div>
          
          <h3 className="text-sm font-medium text-muted-foreground px-4 py-2">{t("command.social")}</h3>
          
          <div className="grid grid-cols-3 gap-2 px-4 py-2">
            <Button
              variant="outline"
              size="icon"
              className="h-14 p-6 aspect-square"
              onClick={() => window.open("https://github.com/Williamlp-dev", "_blank")}
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            
            <Button
              variant="outline"
              size="icon" 
              className="h-14 p-6 aspect-square"
              onClick={() => window.open("https://www.linkedin.com/in/william-lopes-5537792a1/", "_blank")}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-14 p-6 aspect-square"
              onClick={() => window.open("mailto:williamlp.dev@gmail.com")}
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}