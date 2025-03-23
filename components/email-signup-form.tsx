"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function EmailSignupForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [formErrors, setFormErrors] = useState({ email: "" })
  const { toast } = useToast()

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value && !validateEmail(value)) {
      setFormErrors({ email: "Please enter a valid email address" })
    } else {
      setFormErrors({ email: "" })
    }
  }

  useEffect(() => {
    const isValid = email !== "" && validateEmail(email) && !formErrors.email
    setIsFormValid(isValid)
  }, [email, formErrors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "You've been added to our mailing list.",
      })

      setEmail("")
      setFormErrors({ email: "" })
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className={formErrors.email ? "border-red-500" : ""}
            required
          />
          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
      <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
    </form>
  )
}