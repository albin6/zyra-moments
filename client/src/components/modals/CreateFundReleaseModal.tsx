import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CreateFundReleaseModalProps {
  onCreate: (data: {message : string}) => void
  triggerButtonText?: string
}

export function CreateFundReleaseModal({
  onCreate,
  triggerButtonText = "Create Fund Release Request",
}: CreateFundReleaseModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({message : formData.message})

    // Reset form and close modal
    setFormData({ message: '' })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="m-4">{triggerButtonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Fund Release Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          <div className="space-y-2">
            <Label htmlFor="ticketSalesCount">Message To Admin</Label>
            <Input
              id="ticketSalesCount"
              type="text"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Message.."
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

