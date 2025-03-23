"use client"

import type React from "react"

import { useState } from "react"
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
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you would typically send the form data to your backend
    // This is a placeholder for demonstration
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Nomination Submitted!",
        description: "Thank you for nominating a fighter.",
      })

      setOpen(false)
      // Reset form
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
      <DialogContent className="sm:max-w-[500px]">
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
              <Input id="yourName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yourEmail">Your Email</Label>
              <Input id="yourEmail" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineeName">Nominee's Name</Label>
              <Input id="nomineeName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineeEmail">Nominee's Email</Label>
              <Input id="nomineeEmail" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineePhone">Nominee's Phone (if known)</Label>
              <Input id="nomineePhone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Why would they be a good fighter?</Label>
              <Textarea id="reason" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? "Submitting..." : "Submit Nomination"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

