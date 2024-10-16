"use client"
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/hooks/userHook";
import { FileText, LayoutDashboard, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const user = useUserContext()

const currentPath = usePathname();
if(!user.user){
  return <div>Loading...
    <div className="flex justify-center items-center h-screen">
      <Button >
        <Link href="/">Sign in</Link>
       
      </Button>
    </div>
  </div>
}
  
  return (
    <div className="flex h-screen bg-gray-100 w-full ">
    
      {/* Left-side menu */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800"><Link href="/">Fundraising Portal</Link></h2>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 " style={currentPath === "/dashboard" ? { backgroundColor: "red" } : {}}>
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Link>
          <Link href="/dashboard/transactions" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200" style={currentPath === "/dashboard/transactions" ? { backgroundColor: "red" } : {}}>
            <FileText className="mr-2" />
            Transactions
          </Link>
          <Link href="/dashboard/user" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 " style={currentPath === "/dashboard/user" ? { backgroundColor: "red" } : {}}>
     
      <User2Icon/>  
    
    
    <span>{user?.user?.name}</span>
          </Link>
        </nav>
      </div>
      <div className="w-full">
      {children}</div>
    </div>
  );
}
