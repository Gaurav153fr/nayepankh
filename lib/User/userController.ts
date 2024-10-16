/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import userModel from "./userModel";
import userType from "./userType";

class UserError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: any) {
      super(message);
      this.name = "UserError";
    }
  }
  

async function createUser(name: string, email: string) {
    try {
      if (!name || !email) {
        throw new UserError("Invalid input data");
      }
  
      const user = await userModel.findOne({ email, name });
  
      if (user !== null) {
        console.log("User already exists");
        return { success: false, message: "User already exists" };
      } else {
        const data = {
          email,
          name,
          password: "123456789",
          referralCode: name.slice(0, 5).toLowerCase(),
        };
        await userModel.create(data);
        console.log("New user created");
  
        return { success: true, message: "New user created" };
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error creating user:", err);
      return { success: false, message: err.message };
    }
  }
  
  async function getUser(email: string, name: string) {
    try {
      if (!email || !name) {
        throw new UserError("Invalid input data");
      }
  
      const user = await userModel.findOne({ email, name }).lean<userType>();
  
      if (user != null) {
        const data: userType = {
         _id:user._id,
         name:user.name,
         email:user.email,
         referralCode:user.referralCode,
         password:user.password
        };
  
        return data;
      } else {
        console.log("User not found");
        return null;
      }
    } catch (err: any) {
      console.error("Error fetching user:", err);
      return null;
    }
  }
  
async function getUserByReferralCode(referralCode: string) {
    try {
      const user = await userModel.findOne({ referralCode }).lean<userType>();
      if (user) {
        return user;
      } else {
        return null;
      }
    }catch(err:any){
        console.error("Error fetching user:", err);
        return null;
    }

}

async function updateReferralCode( id: string, referralCode: string): Promise<{ success: boolean, message: string }> {
    const isReferralCodeExist = await userModel.findOne({ referralCode,_id:{$ne:id} });
    if(isReferralCodeExist){
        return { success: false, message: "Referral code already exists" };
    }
    try {
      const user = await userModel.findByIdAndUpdate(id, { referralCode });
      if (!user) {
        return { success: false, message: "User not found" };
      }
        return { success: true, message: "Referral code updated" };
    }catch(err:any){
        console.error("Error updating user:", err);
        return { success: false, message: err.message };
    }
}



  export{createUser,getUser,getUserByReferralCode,updateReferralCode}