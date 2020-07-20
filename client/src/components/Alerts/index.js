import React from 'react'
import './style.css'

function Alerts ({ type }) {
  const showAtler = () => {
    if (type === 'danger') {
      return (
        <div class='alert alert-danger animate__animated animate__fadeIn' role='alert'>
          Something went wrong! <br/> Please try again.
        </div>
      )
    } else if (type === 'success') {
      return(
        <div class='alert alert-success animate__animated animate__fadeIn' role='alert'>
          Everythings looking good! Woof!!
        </div>
      )
    }
    else {
      return (
        <>
        </>
      )
    }
  }
  return <>{showAtler()}</>
}

export default Alerts
