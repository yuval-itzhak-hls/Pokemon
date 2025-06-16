import { useState } from 'react'
import './App.css'
import { GenericButton } from './design-system/generic-componenets/GenericButton'

function App() {

  return (
    <>
      <div className="card">
        <GenericButton text= "Button" type="primary" size="medium" onClick={() => console.log('y')}/>
      </div>
    </>
  )
}

export default App
