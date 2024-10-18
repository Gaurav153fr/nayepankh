
import PaymentCard from '@/components/PaymentCard'
import { getUserByReferralCode } from '@/lib/User/userController'

const Refer = async({params}:{params:{referalCode:string}}) => {
    const referCode = params.referalCode
    const user = await getUserByReferralCode(referCode)
    if(!user){
        return <div>Invalid Referral Code</div>
    }
  return (
    <div className='flex flex-col items-center justify-center h-full gap-5 mt-5'>
<div className='font-extrabold text-xl'>You are invited by</div>
<span className=' text-gray-700 text-5xl'>{user?.name}</span>
        <h1>Referal Code: {referCode}</h1>
        <PaymentCard referalCode={referCode} />
    </div>
  )
}

export default Refer