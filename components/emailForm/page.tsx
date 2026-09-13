import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export function InputForm() {
  const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
  ]

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white shadow-xl ring-1 shadow-slate-900/6 ring-slate-900/5">
      {/* agent header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-5">
        <div>
          {/* <User className="h-5 w-5 text-white" /> */}
          <Image
            src={"/avatar.png"}
            alt="avatar"
            width={48}
            height={48}
          ></Image>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Sarah Mitchell</p>
          <p className="text-xs text-slate-500">Property Agent</p>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      <form className="px-6 pt-5 pb-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-name">Name</FieldLabel>
            <Input
              id="form-name"
              type="text"
              placeholder="Evil Rabbit"
              required
              className="border-slate-200 bg-slate-50/50 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-email">Email</FieldLabel>
            <Input
              id="form-email"
              type="email"
              placeholder="john@example.com"
              className="border-slate-200 bg-slate-50/50 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
            />
            <FieldDescription>
              We&apos;ll never share your email with anyone.
            </FieldDescription>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
              <Input
                id="form-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="border-slate-200 bg-slate-50/50 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-country">Country</FieldLabel>
              <Select items={countries} defaultValue="us">
                <SelectTrigger
                  id="form-country"
                  className="border-slate-200 bg-slate-50/50 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="form-address">Address</FieldLabel>
            <Input
              id="form-address"
              type="text"
              placeholder="123 Main St"
              className="border-slate-200 bg-slate-50/50 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-message">Message</FieldLabel>
            <Textarea
              id="form-message"
              placeholder="Type your message here..."
              className="border-slate-200 bg-slate-50/50 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
            />
          </Field>
          <Field className="pt-2">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
            >
              Send Message
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
