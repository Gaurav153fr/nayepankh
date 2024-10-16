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
      <div>
        <h1>User Page</h1>
        <p>Name: {user?.user?.name}</p>
        <p>Email: {user?.user?.email}</p>
        <p>Referral Code: {user?.user?.referralCode}</p>

        <div className="flex items-center gap-2">
          <span>localhost:3000/donate/</span>{" "}
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
