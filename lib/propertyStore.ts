import { properties, type PropertyTypes } from "@/constants/dummyProperty"

const SAVED_PROPERTIES_KEY = "saved_properties"
let cachedSaved: PropertyTypes[] | null = null
let cachedMerged: PropertyTypes[] | null = null
const listeners = new Set<() => void>()

const notify = () => {
  cachedMerged = null
  for (const listener of listeners) listener()
}

const read = (): PropertyTypes[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(SAVED_PROPERTIES_KEY)
    return raw ? (JSON.parse(raw) as PropertyTypes[]) : []
  } catch {
    return []
  }
}

export function getSavedProperties(): PropertyTypes[] {
  if (cachedSaved === null) cachedSaved = read()
  return cachedSaved
}

export function getMergedProperties(): PropertyTypes[] {
  if (cachedMerged === null) {
    cachedMerged = [...getSavedProperties(), ...properties]
  }
  return cachedMerged
}

export function saveProperty(property: PropertyTypes): PropertyTypes[] {
  const updated = [property, ...getSavedProperties()]
  window.localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(updated))
  cachedSaved = updated
  notify()
  return updated
}

export function clearSavedProperties() {
  window.localStorage.removeItem(SAVED_PROPERTIES_KEY)
  cachedSaved = []
  notify()
}

export function nextPropertyId(): number {
  const savedIds = getSavedProperties().map((property) => property.id)
  const staticIds = properties.map((property) => property.id)
  return Math.max(0, ...savedIds, ...staticIds) + 1
}

export function subscribeSavedProperties(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}