import React, {useState} from 'react'
import '../selectdropdown/Select.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

function Select({icon}) { 

    const [isopenselect, setisopenselect] = useState(false);

  return (
    <>
    <ClickAwayListener onClickAway={()=>setisopenselect(false)}>
    <div className='selectdropdown cursor position-relative'>
      {icon}
      <span className='openselect' onClick={openselect}> {selectitem.length > 14 ? selectitem.substr(0, 14)+'...' : selectitem} <FontAwesomeIcon icon={faCaretDown} className='arrow'/> </span>
      {
        isopenselect === true &&
        <div className='dropdown'>
        <div className='searchfield'>
            <input type='text' placeholder='Search...' onChange={filterlist}/>
            <ul className='searchresult'>

              {
                listdata.map((item, index) => {
                  return(
                    <li key={index} onClick={()=> closeselect(index, item)} className={`${selectindex === index ? 'active' : ''}`}> {item}</li>
                  )
                })
              }

            </ul>
        </div>
      </div>
      }
    </div>
    </ClickAwayListener>
    </>
  )
}

export default Select