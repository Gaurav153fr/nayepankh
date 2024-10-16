"use client";
import { Loader2 } from "lucide-react";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  name: string;
  email: string;
  referalCode: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  onSuccess,
  name,
  email,
  referalCode,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
   
    if(!scriptLoaded){
    const loadPayPalScript = () => {
      if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
        // Script is already loaded, no need to load again
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => console.error("Failed to load PayPal script");
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }
  });

  useEffect(() => {
    if (scriptLoaded) {
      if ((window as any).paypal) {
        (window as any).paypal
          .Buttons({
            createOrder: async () => {
              try {
                const res = await fetch("/api/paypal/createOrder", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name, email, amount, referalCode }),
                });
                const data = await res.json();
                console.log(data,"dataf");
                
                return data.orderID;
              } catch (error) {
                console.error("Error creating PayPal order:", error);
              }
            },
            onApprove: async (data: any) => {
              try {
                const res = await fetch("/api/paypal/captureOrder", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    email,
                    amount,
                    orderID: data.orderID,
                  }),
                });
                const result = await res.json();
                if (result.success) {
                  onSuccess(result.details);
                } else {
                  console.error("Payment capture failed:", result.message);
                }
              } catch (error) {
                console.error("Error capturing PayPal order:", error);
              }
            },
          })
          .render("#paypal-button-container");
      }
    }
  });

  return(
  <div>
    {!scriptLoaded && <Loader2 className="animate-spin"/>}
  <div id="paypal-button-container"></div>
  </div>)
};

export default PayPalButton;
