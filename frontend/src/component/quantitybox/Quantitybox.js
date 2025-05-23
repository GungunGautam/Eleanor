// import React, { useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
// import { useState } from 'react';

// function QuantityboxCart({ oldprice, inputvalue, setinputvalue, cartData, setCartData, index, update, setUpdate, editable }) {

//   //product quantity
//   const [inputvaluelocal, setinputvaluelocal] = useState(cartData[index].quantity || 1); //set default index(1)
//   const [calcPrice, setCalcPrice] = useState(cartData[index].newprice)

//   useEffect(() => {
//     const newprice = oldprice * inputvaluelocal

//     setCalcPrice(newprice)
//   }, [inputvaluelocal])

//   useEffect(() => {
//     cartData[index].newprice = calcPrice
//     cartData[index].quantity = inputvaluelocal

//     console.log("cartData[index].newprice ", cartData[index].newprice, cartData)
//     setCartData(cartData)
//     setUpdate(!update)

//   }, [calcPrice])

//   const up = () => {
//     if (inputvalue) {
//       setinputvalue(inputvalue + 1);

//     } else {
//       setinputvaluelocal(inputvaluelocal + 1);


//     }
//   }

//   const down = () => {
//     if (inputvalue !== 1) {
//       if (inputvalue) {
//         setinputvalue(inputvalue - 1);
//       } else {
//         setinputvaluelocal(inputvaluelocal - 1);
//       }
//     }
//   }

//   console.log('newprice', calcPrice)

//   return (
//     <>
//     {editable ?
//       <div className='countersection'>
      
//         <input type='number' value={inputvalue || inputvaluelocal} />
        
//           <span className='arrow up' onClick={up}><FontAwesomeIcon icon={faCaretUp} /></span>
//           <span className='arrow down' onClick={down}><FontAwesomeIcon icon={faCaretDown} /></span>
//       </div> :<span style={{color: "grey", fontSize: "22px", paddingLeft: "15px", marginLeft: "20px", width: "50px", height: "40px", border: "2px solid rgb(8, 68, 77, .2)"}}>{inputvaluelocal}</span> }
//       </>

//   )
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

  // Local state for quantity and calculated price
  const [inputvaluelocal, setinputvaluelocal] = useState(item?.quantity ?? 1);
  const [calcPrice, setCalcPrice] = useState(item?.newprice ?? oldprice ?? 0);

  // Recalculate price when quantity changes
  useEffect(() => {
    setCalcPrice((oldprice ?? 0) * inputvaluelocal);
  }, [inputvaluelocal, oldprice]);

  // Update cartData when price changes
  useEffect(() => {
    if (!item) return;

    const updatedCart = [...cartData];
    updatedCart[index] = {
      ...item,
      newprice: calcPrice,
      quantity: inputvaluelocal,
    };

    setCartData(updatedCart);
    setUpdate(!update);
  }, [calcPrice]);

  // Increase quantity
  const up = () => {
    if (inputvalue !== undefined) {
      setinputvalue(inputvalue + 1);
    } else {
      setinputvaluelocal(prev => prev + 1);
    }
  };

  // Decrease quantity (min 1)
  const down = () => {
    if ((inputvalue ?? inputvaluelocal) > 1) {
      if (inputvalue !== undefined) {
        setinputvalue(inputvalue - 1);
      } else {
        setinputvaluelocal(prev => prev - 1);
      }
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
