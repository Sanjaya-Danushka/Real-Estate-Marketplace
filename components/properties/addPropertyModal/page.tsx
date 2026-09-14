"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import PropertyFormCard from "@/components/properties/propertyFormCard/page"

interface AddPropertyContextValue {
  openAddProperty: () => void
  closeAddProperty: () => void
  isAddPropertyOpen: boolean
}

const AddPropertyContext = createContext<AddPropertyContextValue | null>(null)

export const useAddProperty = () => {
  const ctx = useContext(AddPropertyContext)
  if (!ctx) {
    throw new Error("useAddProperty must be used within AddPropertyProvider")
  }
  return ctx
}

export function AddPropertyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openAddProperty = useCallback(() => setIsOpen(true), [])
  const closeAddProperty = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ openAddProperty, closeAddProperty, isAddPropertyOpen: isOpen }),
    [isOpen, openAddProperty, closeAddProperty]
  )

  return (
    <AddPropertyContext.Provider value={value}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="mx-auto my-6 w-full max-w-2xl sm:my-12">
            <PropertyFormCard onSaved={closeAddProperty} onClose={closeAddProperty} />
          </div>
        </div>
      )}
    </AddPropertyContext.Provider>
  )
}