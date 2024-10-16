import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, amount, referalCode } = body;

    console.log(referalCode, "referalCode");

    // Validate required fields
    if (!amount) {
      return NextResponse.json(
        { success: false, message: "Amount is required" },
        { status: 400 }
      );
    }
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required" },
        { status: 400 }
      );
    }

    // PayPal order creation request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString(),
          },
        },
      ]
    });

    // Execute PayPal request
    const response = await client.execute(request);
console.log(response.result,"response");

    return NextResponse.json(
      { success: true, orderID: response.result.id, name, email, amount, referalCode },
      { status: 201 }
    );
  } catch (error) {
    console.error("PayPal Order Creation Error:", error);

    // Check if it's a PayPal API error or general error
    if (error instanceof paypal.core.PayPalHttpClientError) {
      return NextResponse.json(
        { success: false, message: "PayPal API Error", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error creating PayPal order" },
      { status: 500 }
    );
  }
}
