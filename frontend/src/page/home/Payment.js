import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
import '../cart/Cart.css'
 
export default function Payment() { 
    return ( 
        <PayPalScriptProvider options={{ "client-id": "test" }}> 
            <PayPalButtons style={{ layout: "horizontal" }} /> 
        </PayPalScriptProvider> 
    ); 
}