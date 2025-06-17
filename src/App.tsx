import { useState } from 'react'
import './App.css'
import { GenericButton } from './design-system/generic-componenets/GenericButton'
import { GenericTab } from './design-system/generic-componenets/GenericTab'

function App() {

  return (
    <>
      <div className="card">
        <GenericButton text= "Button" type="secondary" size="medium" onClick={() => console.log('y')}/>
        <GenericTab text="All Pokemons" variant="primaryTab" />
      </div>
    </>
  )
}

export default App
