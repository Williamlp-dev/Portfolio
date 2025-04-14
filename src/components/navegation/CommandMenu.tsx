"use client"

import { useEffect, useRef } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Github, Linkedin, Mail, User, Moon, Sun, Laptop, Home, Briefcase, Code } from "lucide-react"
import { useTheme } from "next-themes"
import { useCommandStore } from "@/lib/store/commandStore"
import { useIsMobile } from "@/hooks/useIsMobile"

export function CommandMenu() {
  const { isOpen, closeCommandMenu, toggleCommandMenu } = useCommandStore()
  const { setTheme } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const { isMobile } = useIsMobile()
  
  useEffect(() => {
    if (isMobile) return
    
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleCommandMenu()
      }
    }
    
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isMobile, toggleCommandMenu])
  
  useEffect(() => {
    if (isOpen && inputRef.current && !isMobile) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, isMobile])
  
  useEffect(() => {
    if (isMobile && isOpen) {
      closeCommandMenu()
    }
  }, [isMobile, isOpen, closeCommandMenu])
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      closeCommandMenu()
    }
  }
  
  if (isMobile) return null
  
  return (
    <CommandDialog open={isOpen} onOpenChange={closeCommandMenu}>
      <CommandInput 
        placeholder="O que você está procurando?" 
        className="text-base py-4" 
        ref={inputRef}
        autoFocus={true}
      />
      <CommandList className="py-2">
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        
        <CommandGroup heading="Navegação">
          <CommandItem 
            onSelect={() => scrollToSection("hero")} 
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Home className="mr-3 h-5 w-5" />
            Início
          </CommandItem>
          <CommandItem 
            onSelect={() => scrollToSection("about")} 
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <User className="mr-3 h-5 w-5" />
            Sobre Mim
          </CommandItem>
          <CommandItem 
            onSelect={() => scrollToSection("projects")} 
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Code className="mr-3 h-5 w-5" />
            Projetos
          </CommandItem>
          <CommandItem 
            onSelect={() => scrollToSection("experience")} 
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Briefcase className="mr-3 h-5 w-5" />
            Experiência
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Tema">
          <CommandItem
            onSelect={() => {
              setTheme("light")
              closeCommandMenu()
            }}
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Sun className="mr-3 h-5 w-5" />
            Modo Claro
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("dark")
              closeCommandMenu()
            }}
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Moon className="mr-3 h-5 w-5" />
            Modo Escuro
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("system")
              closeCommandMenu()
            }}
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Laptop className="mr-3 h-5 w-5" />
            Tema do Sistema
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Social">
          <CommandItem
            onSelect={() => {
              window.open("https://github.com/Williamlp-dev", "_blank")
              closeCommandMenu()
            }}
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Github className="mr-3 h-5 w-5" />
            GitHub
          </CommandItem>
          <CommandItem
            onSelect={() => {
              window.open("https://www.linkedin.com/in/william-lopes-5537792a1/", "_blank")
              closeCommandMenu()
            }}
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Linkedin className="mr-3 h-5 w-5" />
            LinkedIn
          </CommandItem>
          <CommandItem
            onSelect={() => {
              window.location.href = "mailto:williamlp.dev@gmail.com"
              closeCommandMenu()
            }}
            className="text-base py-3 px-4 transition-all duration-200 hover:bg-accent"
          >
            <Mail className="mr-3 h-5 w-5" />
            Contato
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
