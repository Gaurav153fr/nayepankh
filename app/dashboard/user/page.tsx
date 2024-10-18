"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/hooks/userHook";
import React, { useRef } from "react";
import { updateReferralCode } from "@/lib/User/userController";
const UserPage = () => {
  const user = useUserContext();
  const inpRef = useRef<HTMLInputElement>(null);
  const handleChangeReferralCode = async () => {
    if (inpRef.current) {
      const newReferralCode = inpRef.current.value;
      if (user?.user?._id) {
        const res = await updateReferralCode(user?.user?._id, newReferralCode);
        if (res.success) {
          alert(res.message);
        } else {
          alert(res.message);
        }
      }
    }
  };
  return (
    <div>
      <div className="flex flex-col bg-gray-100 w-full gap-5 px-10 py-5">
        <h1 className="text-3xl font-bold text-gray-900">User Page</h1>
        <p className="text-lg text-gray-700 rounded-md shadow-sm p-2">Name: {user?.user?.name}</p>
        <p className="text-lg text-gray-700 rounded-md shadow-sm p-2">Email: {user?.user?.email}</p>
        <p  className="text-lg text-gray-700 rounded-md shadow-sm p-2">Referral Code: <span className="font-mono font-bold">{user?.user?.referralCode}</span> </p>

        <div className="flex items-center gap-2 rounded-md bg-white p-2">
          <span className="text-gray-700 font-sans">{process.env.NEXT_PUBLIC_URL}/donate/</span>{" "}
          <Input
            ref={inpRef}
            type="text"
            placeholder="Enter your referral code"
            defaultValue={user?.user?.referralCode}
            
          />
          <Button onClick={handleChangeReferralCode}>
            Change Referral Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
