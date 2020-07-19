import React from 'react'
import store from '../../utils/store'

function Alerts ({ type }) {
  const showAtler = () => {
    console.log('alerts')
    if (type == 'danger') {
      return (
        <div class='alert alert-danger' role='alert'>
          Something went wrong! Please try again.
        </div>
      )
    } else {
      return(
        <div class='alert alert-success' role='alert'>
          Everythings looking good! Woof!!
        </div>
      )
    }
  }
  return <>{showAtler()}</>
}

export default Alerts
