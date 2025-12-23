import React, { useEffect } from "react";
import Header from "../../component/header/Header";

function Thankyou() {

  useEffect(() => {
    const email = localStorage.getItem("email");
    const cartData = JSON.parse(localStorage.getItem("productArr"));

    if (cartData && email) {
      delete cartData[email];   // remove user's cart
      localStorage.setItem("productArr", JSON.stringify(cartData));
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Thank You for Your Order!</h2>
        <p>Your payment was successful.</p>
      </div>
    </>
  );
}

export default Thankyou;
