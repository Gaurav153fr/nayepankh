"use client"
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { getUser } from "../lib/User/userController";
import userType from "@/lib/User/userType";

// Make sure userType is imported or defined
// import { userType } from './types';

export const UserContext = createContext<{ user: userType | null } | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<userType | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (session?.user) {
          if (session.user.email && session.user.name) {
            const fdata: userType | null = await getUser(
              session.user.email,
              session.user.name,
             
            );
            setUser(fdata);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}