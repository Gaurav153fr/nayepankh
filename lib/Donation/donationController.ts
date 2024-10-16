"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Donation from "./donationModel"
import { donationType } from "./donationType"

async function createDonation(userId:string,donorEmail:string,donorName:string,amount:number){
    try{
        const newDonation = await Donation.create({userId,donorEmail,donorName,amount})
        return {success:true,message:"Donation created successfully",data:newDonation}
    }catch(err:any){
        return {success:false,message:err.message}
    }
}

async function getDonationsByUserId(userId:string):Promise<{success:boolean,message:string,data:donationType[]|null}>{
    try{
        const donations = await Donation.find({userId}).lean<donationType[]>()
        if(donations){
            return {success:true,message:"Donations fetched successfully",data:donations as donationType[]}
        }
        return {success:false,message:"No donations found",data:null}
    }catch(err:any){
        return {success:false,message:err.message,data:null}
    }
}
async function getDonationAmountByUserId(userId:string):Promise<{success:boolean,message:string,data:number|null}>{
    try{
        const donations = await Donation.find({userId}).lean<donationType[]>().select("amount")
        const sum = donations.reduce((acc,donation)=>acc+donation.amount,0)
        if(donations){
            return {success:true,message:"Donations fetched successfully",data:sum}
        }
        return {success:false,message:"No donations found",data:null}
    }catch(err:any){
        return {success:false,message:err.message,data:null}
    }
}
export {createDonation,getDonationsByUserId,getDonationAmountByUserId}