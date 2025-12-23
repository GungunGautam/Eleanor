import React from "react";
import { Button } from "@mui/material";
import Header from "../../component/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import "./Payment.css"
import { useNavigate } from 'react-router-dom';


function Payment() {
  
  const navigate = useNavigate()
  const email = localStorage.getItem("email");
  const CartData = JSON.parse(localStorage.getItem("productArr"));
  const cartData = CartData?.[email] || [];

  const totalAmount = cartData
    .map(item => item.newprice)
    .reduce((a, b) => a + b, 0);

  const loadRazorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay TEST KEY
      amount: totalAmount * 100, // paise
      currency: "INR",
      name: "Eleanor Store",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment Successful");
        console.log("Payment ID:", response.razorpay_payment_id);

        // OPTIONAL: clear cart after payment
        localStorage.removeItem("productArr");
      },
      prefill: {
        email: email
      },
      theme: {
        color: "#08444d"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Header />

      <div className="payment-container">
        <h2>Secure Payment</h2>

        <div className="payment-box">
          <h3>Order Summary</h3>

          {cartData.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.name}</span>
              <span>
                <FontAwesomeIcon icon={faIndianRupee} /> {item.newprice}
              </span>
            </div>
          ))}

          <hr />

          <h3>
            Total: <FontAwesomeIcon icon={faIndianRupee} /> {totalAmount}
          </h3>
        </div>

        <Button
          style={{
            width: "100%",
            backgroundColor: "#08444d",
            color: "white",
            padding: "12px",
            margin:"5px",
            fontSize: "18px",
            textTransform: "capitalize"
          }}
          onClick={() => navigate("/thankyou")}
        >
          Cash on Delivery
        </Button>
        <br/>
        <Button
          style={{
            width: "100%",
            backgroundColor: "#08444d",
            color: "white",
            padding: "12px",
            margin:"5px",
            fontSize: "18px",
            textTransform: "capitalize"
          }}
          onClick={loadRazorpay}
        >
          Pay Securely
        </Button>

      </div>
    </>
  );
}

export default Payment;
