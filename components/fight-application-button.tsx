"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function FightApplicationButton() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [charity, setCharity] = useState("")
  const [experience, setExperience] = useState("0")
  const [isFormValid, setIsFormValid] = useState(false)
  const [formErrors, setFormErrors] = useState({
    phone: "",
    email: "",
  })

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setName: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value
    const namePattern = /^[a-zA-Z-' ]*$/
    if (namePattern.test(value)) {
      setName(value)
    }
  }

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (/^\d{1,3}$/.test(value) && parseInt(value) <= 400)) {
      setWeight(value)
    }
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (/^\d{1,2}$/.test(value) && parseInt(value) <= 84)) {
      setHeight(value)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 10) {
      // Check if the first digit is a 1
      if (value.length > 0 && value[0] === "1") {
        setFormErrors({ ...formErrors, phone: "Phone number cannot start with 1" })
        return // Prevent updating the state
      }
      setPhone(value)
      if (value.length === 10) {
        setFormErrors({ ...formErrors, phone: "" })
      } else if (value.length > 0) {
        setFormErrors({ ...formErrors, phone: "Phone number must be 10 digits" })
      } else {
        setFormErrors({ ...formErrors, phone: "" })
      }
    }
  }

  const formatPhone = (phone: string) => {
    if (phone.length === 0) return ""
    if (phone.length <= 3) return phone
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value && !validateEmail(value)) {
      setFormErrors({ ...formErrors, email: "Please enter a valid email address" })
    } else {
      setFormErrors({ ...formErrors, email: "" })
    }
  }

  const handleCharityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharity(e.target.value)
  }

  useEffect(() => {
    const isValid =
      firstName !== "" &&
      lastName !== "" &&
      weight !== "" &&
      height !== "" &&
      phone.length === 10 &&
      validateEmail(email) &&
      charity !== "" &&
      !formErrors.phone &&
      !formErrors.email

    setIsFormValid(isValid)
  }, [firstName, lastName, weight, height, phone, email, charity, formErrors])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      toast({
        title: "Form Error",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Application Submitted!",
        description: "We'll be in touch soon about your fight application.",
      })

      setFirstName("")
      setLastName("")
      setWeight("")
      setHeight("")
      setPhone("")
      setEmail("")
      setCharity("")
      setExperience("0")
      setOpen(false)
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 text-white hover:bg-red-700">Apply to Fight</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black border border-gray-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Fighter Application</DialogTitle>
            <DialogDescription>
              Fill out this form to apply as a fighter for the White Collar Fight Night.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => handleNameChange(e, setFirstName)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => handleNameChange(e, setLastName)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formatPhone(phone)}
                onChange={handlePhoneChange}
                required
                className={formErrors.phone ? "border-red-500" : ""}
              />
              {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobCompany">Job and Company</Label>
              <Input id="jobCompany" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="text"
                  inputMode="numeric"
                  value={weight}
                  onChange={handleWeightChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="text"
                  inputMode="numeric"
                  value={height}
                  onChange={handleHeightChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Previous Boxing/Fighting Experience</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="6-12">6–12 months</SelectItem>
                  <SelectItem value="1-2">1–2 years</SelectItem>
                  <SelectItem value="2-3">2–3 years</SelectItem>
                  <SelectItem value="3+">3+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {experience !== "0" && (
              <div className="space-y-2">
                <Label htmlFor="experienceDetail">Please elaborate on your experience</Label>
                <Textarea id="experienceDetail" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="why">Why do you want to participate?</Label>
              <Textarea id="why" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="charity">Is there a charity or organization you would like to fundraise for?</Label>
              <Input
                id="charity"
                value={charity}
                onChange={handleCharityChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}