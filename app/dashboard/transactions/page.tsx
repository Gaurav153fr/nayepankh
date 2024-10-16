"use client"
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getDonationsByUserId } from '@/lib/Donation/donationController';
import { useUserContext } from '@/hooks/userHook';
import { format } from 'date-fns'; // Use a date formatting library

export default function Transactions() {
  const [transactions, setTransactions] = useState<donationType[] | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const user = useUserContext();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user?.user?._id) {
        const userTransaction = await getDonationsByUserId(user.user._id as string);
        console.log(userTransaction);
        
        if (userTransaction.success && userTransaction.data) {
          setTransactions(userTransaction.data);
        }
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchTransactions();
  }, [user]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {transactions && transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>{format(new Date(transaction.createdAt), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{transaction.donorName}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>{transaction.donorEmail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div>No transactions found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
