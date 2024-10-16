"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PayPalButton from "./PaymentComp"

export default function PaymentCard({referalCode}:{referalCode:string}) {
  const [amount, setAmount] = useState<number | string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false) // Track form submission
  
  const handleDonationClick = (value: number) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value)
      setAmount(value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name.length < 3) {
      alert("Please enter a valid name")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email")
      return
    }

    if (!amount) {
      alert("Please select or enter a donation amount")
      return
    }

    setIsSubmitted(true) // Mark as submitted to show PayPal button
    console.log("Donation details:", { name, email, amount })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Donate to Our Foundation</CardTitle>
        <CardDescription>Your support makes a difference. Choose an amount to donate.</CardDescription>
      </CardHeader>
     
      <CardContent className="grid gap-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input 
              placeholder="Your email" 
              required 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
            />   
            <Input 
              placeholder="Your name" 
              required 
              onChange={(e) => setName(e.target.value)} 
              value={name}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[10, 20, 30].map((value) => (
              <Button
                key={value}
                type="button"
                variant={amount === value ? "default" : "outline"}
                onClick={() => handleDonationClick(value)}
              >
                ${value}
              </Button>
            ))}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="custom-amount">Custom Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="custom-amount"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-9"
              />
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={!amount}>
          Donate ${amount} <span>({(parseFloat(amount.toString()) * 94).toFixed(2)} INR)</span>
          </Button>
        </form>
      </CardContent>
<div>
    Use following details to test the donation
    <p>Email: sb-9a147u32321126@personal.example.com</p>
    <p>Password: s@|[6Kt/</p>
   
</div>
      {isSubmitted && (
        <CardFooter>
          <div className="w-full">
            <p className="text-sm text-gray-500">You are donating ${amount}</p>
            <PayPalButton amount={parseFloat(amount.toString())} onSuccess={()=>{}} name={name} email={email} referalCode={referalCode} />
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
