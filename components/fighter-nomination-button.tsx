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
import { useToast } from "@/hooks/use-toast"

export default function FighterNominationButton() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const { toast } = useToast()

  const [yourName, setYourName] = useState("")
  const [yourEmail, setYourEmail] = useState("")
  const [nomineeName, setNomineeName] = useState("")
  const [nomineeEmail, setNomineeEmail] = useState("")
  const [nomineePhone, setNomineePhone] = useState("")
  const [reason, setReason] = useState("")
  const [formErrors, setFormErrors] = useState({
    yourEmail: "",
    nomineeEmail: "",
    nomineePhone: "",
  })

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setName: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value
    const namePattern = /^[a-zA-Z-' ]*$/
    if (namePattern.test(value)) {
      setName(value)
    }
  }

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string
  ) => {
    const value = e.target.value
    setEmail(value)
    if (value && !validateEmail(value)) {
      setFormErrors({ ...formErrors, [fieldName]: "Please enter a valid email address" })
    } else {
      setFormErrors({ ...formErrors, [fieldName]: "" })
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 10) {
      // Check if the first digit is a 1
      if (value.length > 0 && value[0] === "1") {
        setFormErrors({ ...formErrors, nomineePhone: "Phone number cannot start with 1" })
        return // Prevent updating the state
      }
      setNomineePhone(value)
      if (value.length === 0 || value.length === 10) {
        setFormErrors({ ...formErrors, nomineePhone: "" })
      } else {
        setFormErrors({ ...formErrors, nomineePhone: "Phone number must be 10 digits" })
      }
    }
  }

  const formatPhone = (phone: string) => {
    if (phone.length === 0) return ""
    if (phone.length <= 3) return phone
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value)
  }

  useEffect(() => {
    const isValid =
      yourName !== "" &&
      yourEmail !== "" &&
      nomineeName !== "" &&
      nomineeEmail !== "" &&
      reason !== "" &&
      validateEmail(yourEmail) &&
      validateEmail(nomineeEmail) &&
      (nomineePhone.length === 0 || nomineePhone.length === 10) &&
      !formErrors.yourEmail &&
      !formErrors.nomineeEmail &&
      !formErrors.nomineePhone

    setIsFormValid(isValid)
  }, [yourName, yourEmail, nomineeName, nomineeEmail, nomineePhone, reason, formErrors])

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
        title: "Nomination Submitted!",
        description: "Thank you for nominating a fighter.",
      })

      setYourName("")
      setYourEmail("")
      setNomineeName("")
      setNomineeEmail("")
      setNomineePhone("")
      setReason("")
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
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
          Nominate a Fighter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black border border-gray-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Fighter Nomination</DialogTitle>
            <DialogDescription>
              Know someone who would be great for the White Collar Fight Night? Nominate them here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="yourName">Your Name</Label>
              <Input
                id="yourName"
                value={yourName}
                onChange={(e) => handleNameChange(e, setYourName)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yourEmail">Your Email</Label>
              <Input
                id="yourEmail"
                type="email"
                value={yourEmail}
                onChange={(e) => handleEmailChange(e, setYourEmail, "yourEmail")}
                required
                className={formErrors.yourEmail ? "border-red-500" : ""}
              />
              {formErrors.yourEmail && <p className="text-red-500 text-xs mt-1">{formErrors.yourEmail}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineeName">Nominee's Name</Label>
              <Input
                id="nomineeName"
                value={nomineeName}
                onChange={(e) => handleNameChange(e, setNomineeName)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineeEmail">Nominee's Email</Label>
              <Input
                id="nomineeEmail"
                type="email"
                value={nomineeEmail}
                onChange={(e) => handleEmailChange(e, setNomineeEmail, "nomineeEmail")}
                required
                className={formErrors.nomineeEmail ? "border-red-500" : ""}
              />
              {formErrors.nomineeEmail && <p className="text-red-500 text-xs mt-1">{formErrors.nomineeEmail}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineePhone">Nominee's Phone (if known)</Label>
              <Input
                id="nomineePhone"
                type="tel"
                value={formatPhone(nomineePhone)}
                onChange={handlePhoneChange}
                className={formErrors.nomineePhone ? "border-red-500" : ""}
              />
              {formErrors.nomineePhone && <p className="text-red-500 text-xs mt-1">{formErrors.nomineePhone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Why would they be a good fighter?</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={handleReasonChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
            >
              {isSubmitting ? "Submitting..." : "Submit Nomination"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}