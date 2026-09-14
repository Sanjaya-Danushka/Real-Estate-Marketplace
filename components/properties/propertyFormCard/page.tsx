"use client"

import Image from "next/image"
import React, { type ChangeEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Building,
  Building2,
  Castle,
  Check,
  Home,
  House,
  KeyRound,
  Map,
  Store,
  Tag,
  Upload,
  X,
} from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type PropertyTypes } from "@/constants/dummyProperty"
import { nextPropertyId, saveProperty } from "@/lib/propertyStore"
import PropertyCard from "@/components/properties/propertyCard/page"

const Steps = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURE: 3,
  IMAGE: 4,
  PRICING: 5,
} as const

const PROPERTY_TYPES = ["Apartment", "House", "Villa", "Condo", "Land", "Commercial"] as const
const PROPERTY_STATUS = ["For Sale", "For Rent"] as const
const SAMPLE_IMAGES = Array.from({ length: 12 }, (_, i) => `/image${i + 1}.jpg`)

const TYPE_ICONS = {
  Apartment: Building2,
  House: House,
  Villa: Castle,
  Condo: Building,
  Land: Map,
  Commercial: Store,
} as const

const STATUS_ICONS = {
  "For Sale": Tag,
  "For Rent": KeyRound,
} as const

interface PropertyFormState {
  type: (typeof PROPERTY_TYPES)[number] | ""
  status: (typeof PROPERTY_STATUS)[number] | ""
  title: string
  location: string
  description: string
  bedrooms: string
  bathrooms: string
  area: string
  featured: boolean
  image: string
  price: string
}

interface PropertyFormCardProps {
  onSaved?: (property: PropertyTypes) => void
  onClose?: () => void
}

const stepTitles = [
  "Select Property Type",
  "Where is your property located?",
  "Share some basics about your place",
  "Property Features",
  "Upload property image",
  "Set your pricing details",
]

const PropertyFormCard = ({ onSaved, onClose }: PropertyFormCardProps) => {
  const [step, setStep] = useState<number>(Steps.TYPE)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState<PropertyTypes | null>(null)
  const [form, setForm] = useState<PropertyFormState>({
    type: "",
    status: "",
    title: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    featured: false,
    image: "",
    price: "",
  })

  const update = <K extends keyof PropertyFormState>(
    key: K,
    value: PropertyFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }))

  const isStepValid = () => {
    switch (step) {
      case Steps.TYPE:
        return Boolean(form.type && form.status)
      case Steps.LOCATION:
        return form.title.trim().length > 0 && form.location.trim().length > 0
      case Steps.DETAILS:
        return (
          form.bedrooms !== "" && form.bathrooms !== "" && form.area !== ""
        )
      case Steps.FEATURE:
        return true
      case Steps.IMAGE:
        return Boolean(form.image)
      case Steps.PRICING:
        return Number(form.price) > 0
      default:
        return false
    }
  }

  const createListing = () => {
    if (!form.type || !form.status) return
    setLoading(true)
    const property: PropertyTypes = {
      id: nextPropertyId(),
      title: form.title,
      location: form.location,
      price: Number(form.price),
      type: form.type,
      status: form.status,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      area: Number(form.area) || 0,
      featured: form.featured,
      image: form.image,
      description: form.description,
    }
    setTimeout(() => {
      saveProperty(property)
      setSaved(property)
      setLoading(false)
      onSaved?.(property)
    }, 400)
  }

  const resetForm = () => {
    setForm({
      type: "",
      status: "",
      title: "",
      location: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      featured: false,
      image: "",
      price: "",
    })
    setSaved(null)
    setStep(Steps.TYPE)
  }

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new window.Image()
      img.onload = () => {
        const MAX_SIZE = 800
        let { width, height } = img
        if (width > height && width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width)
          width = MAX_SIZE
        } else if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height)
          height = MAX_SIZE
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)
        update("image", canvas.toDataURL("image/jpeg", 0.8))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
    event.target.value = ""
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-700">
          <Check className="size-6 shrink-0" />
          <div>
            <h3 className="font-semibold">Listing saved successfully!</h3>
            <p className="text-sm">
              Your property has been added to the marketplace.
            </p>
          </div>
        </div>
        <div className="mt-8 w-full">
          <p className="mb-4 text-sm font-medium text-text/70">Preview</p>
          <PropertyCard property={saved} />
        </div>
        <div className="mt-8 flex gap-4">
          {onClose && (
            <Button
              className="rounded-full bg-primary px-6 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              onClick={onClose}
            >
              Done
            </Button>
          )}
          <Button
            variant="outline"
            className="rounded-full px-6 font-medium"
            onClick={resetForm}
          >
            Add another property
          </Button>
          <Button
            className="rounded-full bg-primary px-6 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="mr-2 size-4" />
            Go to homepage
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5 sm:p-8">
      {/* header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm">
        <span className="rounded-full bg-primary/10 px-4 py-1.5 font-medium text-primary">
          Step {step + 1} of 6
        </span>
        <div className="flex items-center gap-3">
          <span className="font-medium text-text">{stepTitles[step]}</span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close form"
              className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-text"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <FieldGroup>
        {step === Steps.TYPE && (
          <>
            <Field>
              <FieldLabel>Property Type</FieldLabel>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {PROPERTY_TYPES.map((type) => {
                  const selected = form.type === type
                  const Icon = TYPE_ICONS[type]
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => update("type", type)}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-slate-200 bg-white text-text/70 hover:border-primary/50 hover:text-text"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition ${
                          selected
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-text/50"
                        }`}
                      >
                        <Icon className="size-5" />
                      </span>
                      {type}
                    </button>
                  )
                })}
              </div>
              {!form.type && (
                <FieldError>Please select a property type.</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                {PROPERTY_STATUS.map((status) => {
                  const selected = form.status === status
                  const Icon = STATUS_ICONS[status]
                  return (
                    <button
                      key={status}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => update("status", status)}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-slate-200 bg-white text-text/70 hover:border-primary/50 hover:text-text"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition ${
                          selected
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-text/50"
                        }`}
                      >
                        <Icon className="size-5" />
                      </span>
                      {status}
                    </button>
                  )
                })}
              </div>
              {!form.status && (
                <FieldError>Please select a listing status.</FieldError>
              )}
            </Field>
          </>
        )}

        {step === Steps.LOCATION && (
          <>
            <Field>
              <FieldLabel htmlFor="form-title">Title</FieldLabel>
              <Input
                id="form-title"
                type="text"
                placeholder="e.g. Modern Family Villa"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                className="border-slate-200 bg-slate-50/50 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-location">Location</FieldLabel>
              <Input
                id="form-location"
                type="text"
                placeholder="e.g. Colombo 03"
                value={form.location}
                onChange={(event) => update("location", event.target.value)}
                className="border-slate-200 bg-slate-50/50 focus-visible:border-primary focus-visible:ring-primary/20"
              />
              <FieldDescription>
                City, area or province where the property is located.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="form-description">Description</FieldLabel>
              <Textarea
                id="form-description"
                placeholder="Describe your property..."
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                className="border-slate-200 bg-slate-50/50 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </Field>
          </>
        )}

        {step === Steps.DETAILS && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="form-bedrooms">Bedrooms</FieldLabel>
              <Input
                id="form-bedrooms"
                type="number"
                min={0}
                placeholder="3"
                value={form.bedrooms}
                onChange={(event) => update("bedrooms", event.target.value)}
                className="border-slate-200 bg-slate-50/50 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-bathrooms">Bathrooms</FieldLabel>
              <Input
                id="form-bathrooms"
                type="number"
                min={0}
                placeholder="2"
                value={form.bathrooms}
                onChange={(event) => update("bathrooms", event.target.value)}
                className="border-slate-200 bg-slate-50/50 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-area">Area (sqft)</FieldLabel>
              <Input
                id="form-area"
                type="number"
                min={0}
                placeholder="1200"
                value={form.area}
                onChange={(event) => update("area", event.target.value)}
                className="border-slate-200 bg-slate-50/50 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </Field>
          </div>
        )}

        {step === Steps.FEATURE && (
          <Field>
            <FieldLabel>Featured Listing</FieldLabel>
            <button
              type="button"
              aria-pressed={form.featured}
              onClick={() => update("featured", !form.featured)}
              className={`flex w-fit items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                form.featured
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-slate-200 bg-slate-50/50 text-text/70"
              }`}
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full border transition ${
                  form.featured ? "border-primary bg-primary text-white" : "border-slate-300"
                }`}
              >
                {form.featured && <Check className="size-3" />}
              </span>
              {form.featured ? "This property is featured" : "Mark as featured"}
            </button>
            <FieldDescription>
              Featured listings are highlighted on the home page.
            </FieldDescription>
          </Field>
        )}

        {step === Steps.IMAGE && (
          <>
            {form.image && (
              <div className="relative h-52 w-full overflow-hidden rounded-2xl ring-1 ring-slate-200">
                <Image
                  src={form.image}
                  alt="Selected property image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 48rem"
                />
                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
                  Selected image
                </span>
                {form.image.startsWith("data:") && (
                  <button
                    type="button"
                    onClick={() => update("image", "")}
                    className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    aria-label="Remove image"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            )}
            <label
              htmlFor="form-image-upload"
              className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 px-6 py-10 text-center transition hover:border-primary hover:bg-primary/5"
            >
              <Upload className="size-7 text-text/40" />
              <span className="font-medium text-text">Upload your own image</span>
              <span className="text-sm text-text/50">
                or choose one of the samples below
              </span>
              <input
                id="form-image-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleUpload}
              />
            </label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {SAMPLE_IMAGES.map((src) => {
                const selected = form.image === src
                return (
                  <button
                    key={src}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => update("image", src)}
                    className={`group relative aspect-square overflow-hidden rounded-2xl transition ${
                      selected
                        ? "ring-2 ring-primary ring-offset-2"
                        : "ring-1 ring-slate-200 hover:ring-primary/50"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Sample ${src}`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                    {selected && (
                      <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="size-4" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {step === Steps.PRICING && (
          <Field>
            <FieldLabel htmlFor="form-price">
              Price ({form.status === "For Rent" ? "per month" : "total"})
            </FieldLabel>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg font-semibold text-text/50">
                $
              </span>
              <Input
                id="form-price"
                type="number"
                min={0}
                placeholder="500"
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                className="border-slate-200 bg-slate-50/50 pl-10 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </div>
            <FieldDescription>
              {form.status
                ? `This listing will be shown as ${form.status}.`
                : "Set the amount you want to list this property for."}
            </FieldDescription>
          </Field>
        )}
      </FieldGroup>

      {/* footer */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          className="rounded-full bg-transparent px-6 font-medium text-text"
          onClick={() => setStep(Steps.TYPE)}
          disabled={step === Steps.TYPE}
        >
          Back
        </Button>
        <Button
          className="rounded-full bg-primary px-8 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-50"
          onClick={() =>
            step < Steps.PRICING ? setStep((prev) => prev + 1) : createListing()
          }
          disabled={!isStepValid() || loading}
        >
          {loading ? (
            <X className="animate-spin" />
          ) : step === Steps.PRICING ? (
            "Save Listing"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  )
}

export default PropertyFormCard