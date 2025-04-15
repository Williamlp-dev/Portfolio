"use client"

import { Button } from "@/components/ui/button"
import { useCommandStore } from "@/lib/store/commandStore"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useLanguage } from "@/components/Language/language-provider"

export function CommandKButton() {
  const { openCommandMenu } = useCommandStore()
  const { isMobile } = useIsMobile()
  const { t } = useLanguage()
  
  if (isMobile) return null
  
  return (
    <Button
      variant="outline"
      onClick={openCommandMenu}
      className="px-6 py-6 text-base transition-all duration-300 hover:bg-primary/10"
    >
      {t("button.press")}{" "}
      <kbd className="pointer-events-none mx-1 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
        ⌘
      </kbd>
      <kbd className="pointer-events-none mx-1 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
        K
      </kbd>
    </Button>
  )
}