import { useState } from 'react'
import './App.css'
import { GenericButton } from './design-system/generic-componenets/GenericButton'
import { GenericTab } from './design-system/generic-componenets/GenericTab'

function App() {

  return (
    <>
      <div className="card">
        <GenericButton text= "Button" type="secondary" size="medium" onClick={() => console.log('y')}/>
        <GenericTab
            variant="secondaryTab"
            tabs={[
              {
                label: "List",
                value: "list",
                icon: "list",
              },
              {
                label: "Cards",
                value: "card",
                icon: "cards",
              },
            ]}
          />
           <GenericTab
            variant="primaryTab"
            tabs={[
              {
                label: "All Pokemons",
                value: "all pokemons",
              },
              {
                label: "My Pokemons",
                value: "my pokemons",
              },
            ]}
          />
      </div>
    </>
  )
}

export default App
