// /app/api/paypal/capture-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { createDonation } from "@/lib/Donation/donationController";
import User from "@/lib/User/userModel";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, amount, orderID, referalCode } = body;

    console.log("Capture order request body:", body);

    // Validate the presence of the orderID
    if (!orderID) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    // Create a request to capture the order
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    // Capturing an order usually does not require a request body, PayPal handles it.

    // Execute the PayPal order capture
    const response = await client.execute(request);

    if (response.result.status === "COMPLETED") {
      // Payment is successful, update the database (points/donations) here

      console.log("Payment completed. Updating points and donations...");

      // Call function to add points/donations based on referalCode
      const updateResult = await addDonationAndPoints(name, email, amount, referalCode);

      if (updateResult) {
        return NextResponse.json(
          { success: true, details: response.result, message: "Points and donations updated successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: true, details: response.result, message: "Payment captured, but referral not found" },
          { status: 200 }
        );
      }
    } else {
      // If payment is not completed
      return NextResponse.json(
        { success: false, message: "Payment not completed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("PayPal Capture Order Error:", error);

    return NextResponse.json(
      { success: false, message: "Error capturing PayPal order" },
      { status: 500 }
    );
  }
}

// Function to update coins/donations in the database
async function addDonationAndPoints(name: string, email: string, amount: number, referalCode: string) {
  try {
    // Find the user by referral code
    const user = await User.findOne({ referalCode });

    if (!user) {
      console.warn("User not found for referral code:", referalCode);
      return false;
    }

    // Create a new donation record
    const newDonation = await createDonation(user._id, email, name, amount);
    console.log("New donation created:", newDonation);

    // You can also update user points or other logic here
    // Example: user.points += 10; await user.save();

    return true;
  } catch (error) {
    console.error("Error updating points or donations:", error);
    return false;
  }
}
