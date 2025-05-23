import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Thankyou() {
    return (
        <>

            <div className='container-fluid w-100'>
                <div className='row'>
                    <div className='col  d-flex align-items-center justify-content-center'>
                        <div className='thankpage d-flex align-items-center justify-content-center'>
                            <div className='thankyousection shadow'>
                                <div className='img'>
                                    <img src={require('../../asset/image/thankyou.png')} />

                                    <Link to={'/'} ><Button>Go Back</Button></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Thankyou