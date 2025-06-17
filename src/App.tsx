import { useState } from 'react'
import './App.css'
import { GenericButton } from './design-system/generic-componenets/GenericButton'
import { GenericTab } from './design-system/generic-componenets/GenericTab'
import { SearchBar } from './design-system/generic-componenets/SearchBar'
import { GenericDropDown} from './design-system/generic-componenets/GenericDropDown'
import type { Options  } from './design-system/generic-componenets/GenericDropDown'


const pokemons: Options[] = [
      { value: "bulbasaur", label: "Bulbasaur" },
      { value: "wartortle", label: "Wartortle"},
      { value: "caterpie",  label: "Caterpie"},
    ];

function App() {
    const [q, setQ] = useState("");
    const [poke, setPoke] = useState<string>();
    
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

          <SearchBar
            value={q}
            onChange={setQ}
            onSearch={(v) => console.log("Search:", v)}
          />
          <p className="text-sm text-gray-600">Current query: {q}</p>


          <GenericDropDown
            placeholder="Sort by"
            options={pokemons}
            value={poke}
            onValueChange={setPoke}
            disabled={false}
          />
      </div>
    </>
  )
}

export default App
