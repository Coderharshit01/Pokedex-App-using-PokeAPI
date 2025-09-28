import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import PokeDetails from "./pages/PokeDetails"

function App() {
  const [pokeData, setPokeData] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchPokeData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302")
        const data = await response.json()
        setPokeData(data)
      } catch (er) {
        console.error(er)
      }
    }
    fetchPokeData()
  }, [])

  return (
    <Router>
 

      <Routes>
        <Route path="/" element={<Home pokeData={pokeData} search={search} setSearch={setSearch} />} />
        <Route path="/pokemon/:name" element={<PokeDetails />} />
      </Routes>
    </Router>
  )
}

export default App
