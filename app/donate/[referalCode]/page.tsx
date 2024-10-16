
import PaymentCard from '@/components/PaymentCard'
import { getUserByReferralCode } from '@/lib/User/userController'

const Refer = async({params}:{params:{referalCode:string}}) => {
    const referCode = params.referalCode
    const user = await getUserByReferralCode(referCode)
    if(!user){
        return <div>Invalid Referral Code</div>
    }
  return (
    <div className='flex flex-col items-center justify-center h-full'>
<div className='font-extrabold text-5xl'>You are invited by <span>{user?.name}</span></div>
        <h1>Referal Code: {referCode}</h1>
        <PaymentCard referalCode={referCode} />
    </div>
  )
}

export default Refer