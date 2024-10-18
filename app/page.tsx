"use client"

import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"

import { Heart,  } from 'lucide-react'
import { useUserContext } from '@/hooks/userHook'

const Home = () => {
  const user = useUserContext()
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Naye Pankh</span>
        </div>
        
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-xl text-muted-foreground mb-8">Your generosity can change lives. Join us in our mission to create a better world.</p>
        {user?.user?.name ? (<div>

          <Button size="lg" >
             <Link href="/dashboard">GO to Dashboard</Link>
         
          </Button>
          <Button size="lg"  onClick={()=>signOut()} className='mt-4 ml-4'>Sign out</Button>
        </div>):( <Button size="lg"  onClick={()=>signIn("github")} className='mt-4 ml-4'>
          Sign in with Github
          </Button>)}
          
         
          
        </section>

        <section id="about" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>About Our Cause</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We are dedicated to improving lives through sustainable development projects, education initiatives, and emergency relief efforts. Your donations directly support communities in need, creating lasting positive change.</p>
            </CardContent>
          </Card>
        </section>

      </main>

      <footer className="bg-muted py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Nayepankh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home