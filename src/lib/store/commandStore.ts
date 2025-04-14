"use client"

import { create } from 'zustand'

type CommandMenuState = {
  isOpen: boolean
  openCommandMenu: () => void
  closeCommandMenu: () => void
  toggleCommandMenu: () => void
}

export const useCommandStore = create<CommandMenuState>((set) => ({
  isOpen: false,
  openCommandMenu: () => set({ isOpen: true }),
  closeCommandMenu: () => set({ isOpen: false }),
  toggleCommandMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}))