
// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

// function QuantityboxCart({
//   oldprice,
//   inputvalue,
//   setinputvalue,
//   cartData = [],
//   setCartData,
//   index,
//   update,
//   setUpdate,
//   editable,
// }) {
//   // Safely get item from cartData
//   const item = cartData?.[index];

//   // Local state for quantity and calculated price
//   const [inputvaluelocal, setinputvaluelocal] = useState(item?.quantity ?? 1);
//   const [calcPrice, setCalcPrice] = useState(item?.newprice ?? oldprice ?? 0);

//   // Recalculate price when quantity changes
//   useEffect(() => {
//     setCalcPrice((oldprice ?? 0) * inputvaluelocal);
//   }, [inputvaluelocal, oldprice]);

//   // Update cartData when price changes
//   useEffect(() => {
//     if (!item) return;

//     const updatedCart = [...cartData];
//     updatedCart[index] = {
//       ...item,
//       newprice: calcPrice,
//       quantity: inputvaluelocal,
//     };

//     setCartData(updatedCart);
//     setUpdate(!update);
//   }, [calcPrice]);

//   // Increase quantity
//   const up = () => {
//     if (inputvalue !== undefined) {
//       setinputvalue(inputvalue + 1);
//     } else {
//       setinputvaluelocal(prev => prev + 1);
//     }
//   };

//   // Decrease quantity (min 1)
//   const down = () => {
//     if ((inputvalue ?? inputvaluelocal) > 1) {
//       if (inputvalue !== undefined) {
//         setinputvalue(inputvalue - 1);
//       } else {
//         setinputvaluelocal(prev => prev - 1);
//       }
//     }
//   };

//   const displayValue = inputvalue ?? inputvaluelocal;

//   return (
//     <>
//       {editable ? (
//         <div className="countersection">
//           <input type="number" value={displayValue} readOnly />
//           <span className="arrow up" onClick={up}>
//             <FontAwesomeIcon icon={faCaretUp} />
//           </span>
//           <span className="arrow down" onClick={down}>
//             <FontAwesomeIcon icon={faCaretDown} />
//           </span>
//         </div>
//       ) : (
//         <span
//           style={{
//             color: 'grey',
//             fontSize: '22px',
//             paddingLeft: '15px',
//             marginLeft: '20px',
//             width: '50px',
//             height: '40px',
//             border: '2px solid rgba(8, 68, 77, 0.2)',
//           }}
//         >
//           {displayValue}
//         </span>
//       )}
//     </>
//   );
// }

// export default QuantityboxCart;

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

function QuantityboxCart({
  oldprice,
  inputvalue,
  setinputvalue,
  cartData = [],
  setCartData,
  index,
  update,
  setUpdate,
  editable,
}) {
  // Safely get item from cartData
  const item = cartData?.[index];

  // Local state for quantity - initialize from cart item
  const [inputvaluelocal, setinputvaluelocal] = useState(item?.quantity ?? 1);

  // Sync local state with cart data when cart changes externally
  useEffect(() => {
    if (item?.quantity !== undefined) {
      setinputvaluelocal(item.quantity);
    }
  }, [item?.quantity]);

  // Update cart when local quantity changes
  const updateCartItem = (newQuantity) => {
    if (!item) return;

    // CRITICAL: Always use the ORIGINAL unit price, never the calculated subTotal
    // Priority: oldprice (passed as prop) > item.originalPrice > item.price
    const unitPrice = oldprice || item.originalPrice || item.price || item.unitPrice || item.oldprice || 0;
    const newSubTotal = unitPrice * newQuantity;
    
    console.log(`=== Updating item ${index} ===`);
    console.log('oldprice prop:', oldprice);
    console.log('item.originalPrice:', item.originalPrice);
    console.log('item.price:', item.price);
    console.log('Using unitPrice:', unitPrice);
    console.log('New quantity:', newQuantity);
    console.log('New subtotal:', newSubTotal);
    
    // Create a fresh copy of the cart array
    const updatedCart = cartData.map((cartItem, idx) => {
      if (idx === index) {
        return {
          ...cartItem,
          originalPrice: unitPrice,  // ← Preserve the original unit price
          price: unitPrice,          // Keep the unit price
          unitPrice: unitPrice,      // Also set unitPrice for consistency
          subTotal: newSubTotal,     // Update subtotal
          newprice: newSubTotal,     // Also set newprice for consistency
          quantity: newQuantity,     // Update quantity
        };
      }
      return cartItem;
    });

    console.log('Updated cart:', updatedCart);
    setCartData(updatedCart);
  };

  // Increase quantity
  const up = () => {
    const newQuantity = inputvaluelocal + 1;
    setinputvaluelocal(newQuantity);
    updateCartItem(newQuantity);
  };

  // Decrease quantity (min 1)
  const down = () => {
    if (inputvaluelocal > 1) {
      const newQuantity = inputvaluelocal - 1;
      setinputvaluelocal(newQuantity);
      updateCartItem(newQuantity);
    }
  };

  const displayValue = inputvalue ?? inputvaluelocal;

  return (
    <>
      {editable ? (
        <div className="countersection">
          <input type="number" value={displayValue} readOnly />
          <span className="arrow up" onClick={up}>
            <FontAwesomeIcon icon={faCaretUp} />
          </span>
          <span className="arrow down" onClick={down}>
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </div>
      ) : (
        <span
          style={{
            color: 'grey',
            fontSize: '22px',
            paddingLeft: '15px',
            marginLeft: '20px',
            width: '50px',
            height: '40px',
            border: '2px solid rgba(8, 68, 77, 0.2)',
          }}
        >
          {displayValue}
        </span>
      )}
    </>
  );
}

export default QuantityboxCart;