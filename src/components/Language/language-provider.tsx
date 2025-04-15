"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

// Expanded translations
const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    // Hero section
    "hero.mission": "You are accessing the system of a developer in constant evolution",
    "hero.title": "William Lopes",
    "hero.subtitle": "Full Stack Developer & UI/UX Enthusiast",
    "hero.cta": "View Projects",
    
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    
    // Command menu
    "command.placeholder": "Type a command or search...",
    "command.noResults": "No results found.",
    "command.nav": "Navigation",
    "command.theme": "Theme",
    "command.social": "Social",
    
    // Button
    "button.press": "Press",
    
    // About section
    "about.title": "About Me",
    "about.p1": "I'm a passionate Full Stack Developer with expertise in modern web technologies like React, Next.js, and Node.js. I love building intuitive user interfaces and robust backend systems.",
    "about.p2": "With a deep interest in UI/UX design, I strive to create digital experiences that are not only functional but also visually appealing and user-friendly.",
    "about.resume": "Download Resume",
    
    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    
    // Language
    "language.en": "English",
    "language.pt": "Portuguese",
    "language.switch": "Switch to Portuguese"
  },
  pt: {
    // Hero section
    "hero.mission": "Você está acessando o sistema de um desenvolvedor em constante evolução",
    "hero.title": "William Lopes",
    "hero.subtitle": "Desenvolvedor Full Stack & Entusiasta de UI/UX",
    "hero.cta": "Ver Projetos",
    
    // Navigation
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.experience": "Experiência",
    
    // Command menu
    "command.placeholder": "Digite um comando ou pesquise...",
    "command.noResults": "Nenhum resultado encontrado.",
    "command.nav": "Navegação",
    "command.theme": "Tema",
    "command.social": "Social",
    
    // Button
    "button.press": "Pressione",
    
    // About section
    "about.title": "Sobre Mim",
    "about.p1": "Sou um Desenvolvedor Full Stack apaixonado, com experiência em tecnologias web modernas como React, Next.js e Node.js. Adoro construir interfaces de usuário intuitivas e sistemas backend robustos.",
    "about.p2": "Com um profundo interesse em design de UI/UX, me esforço para criar experiências digitais que não são apenas funcionais, mas também visualmente atraentes e amigáveis ao usuário.",
    "about.resume": "Baixar Currículo",
    
    // Theme
    "theme.light": "Claro",
    "theme.dark": "Escuro",
    "theme.system": "Sistema",
    
    // Language
    "language.en": "Inglês",
    "language.pt": "Português",
    "language.switch": "Mudar para Inglês"
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("pt")
  
  // Set up language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage === "en" || savedLanguage === "pt") {
      setLanguage(savedLanguage)
    }
  }, [])
  
  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])
  
  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt")
  }
  
  const t = (key: string) => {
    if (!translations[language] || !translations[language][key]) {
      return key
    }
    return translations[language][key]
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  
  return context
}