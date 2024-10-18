
"use client";
import { useEffect, useState } from "react";
import {
 
  Copy,
  MessageCircle,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useUserContext } from "@/hooks/userHook";
import Link from "next/link";
import { useQRCode } from "next-qrcode";
import { getDonationAmountByUserId } from "@/lib/Donation/donationController";

export default function Dashboard() {
  // This would typically come from your auth system
  const user = useUserContext();
  const [totalDonations, setTotalDonations] = useState(0); // This would be fetched from your backend
  const { Canvas } = useQRCode();
  const copyDonationLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/donate/${user?.user?.referralCode}`
    );
    alert("Donation link copied to clipboard!");
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `Support our cause! Donate here: ${process.env.NEXT_PUBLIC_URL}/donate/${user?.user?.referralCode}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };
useEffect(()=>{
  const fetchDonationAmount = async () => {
    const donationAmount = await getDonationAmountByUserId(user?.user?._id as string)
    if(donationAmount.success && donationAmount.data){
      setTotalDonations(donationAmount.data)
    }
  }
  fetchDonationAmount()
})
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user.user?.name}!
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-full py-10 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold mb-4">Goal Achieved</h2>
              <p className="text-4xl font-bold text-green-600 mb-8">
                ${totalDonations} = ₹{totalDonations*94}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={copyDonationLink}
                  className="flex items-center"
                >
                  <Copy className="mr-2" />
                  Copy Donation Link
                </Button>
                <Button onClick={shareOnWhatsApp} className="flex items-center">
                  <MessageCircle className="mr-2" />
                  Share on WhatsApp
                </Button>
              </div>
              <div>
                <Link href={`/donate/${user?.user?.referralCode}`} className="text-blue-500 hover:text-blue-600">
                  GO to your referal Link
                </Link>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
                <p className="text-lg font-semibold">{user?.user?.referralCode}</p>
              </div>
              
              <div>
                <h3>Qr Code</h3>
                <Canvas
      text={`${process.env.NEXT_PUBLIC_URL}/donate/${user?.user?.referralCode}`}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }}
    />
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}


export const dynamic = "force-dynamic"