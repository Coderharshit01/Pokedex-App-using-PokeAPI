import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce.js";
import Navbar from "../components/Navbar.jsx";

function Home({ pokeData, search , setSearch }) {
  const [loading, setLoading] = useState(false);
  const [pokeInfo, setPokeInfo] = useState([]);
  const [showInfo, setShowInfo] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const fetchPokeInfo = async (p) => {
    const res = await fetch(p.url);
    return res.json();
  };


  useEffect(() => {
    if (isSearching) return; 

    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
        );
        const data = await response.json();
        if (data?.results) {
          const promises = data.results.map((p) => fetchPokeInfo(p));
          const allPokemon = await Promise.all(promises);


          setPokeInfo((prev) => {
            const newOnes = allPokemon.filter(
              (poke) => !prev.some((p) => p.id === poke.id)  // preventing duplication
            );
            return [...prev, ...newOnes];
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [offset, isSearching]);

  useEffect(() => {
    if (!isSearching) {
      setShowInfo(pokeInfo);
    }
  }, [pokeInfo, isSearching]);

  const debouncedSearch = useDebounce(search,400)

  useEffect(() => {
    const searchIn = async () => {
      if (debouncedSearch.trim() === "") {
        setIsSearching(false);
        setShowInfo(pokeInfo);
      } else {
        setIsSearching(true);
        const matches = pokeData.results.filter((p) =>
          p.name.includes(debouncedSearch.toLowerCase())
        );
  
        // Limit to first 20 matches to prevent lag
        const prom = matches.slice(0, 20).map((m) => fetchPokeInfo(m));
        const searchedPoke = await Promise.all(prom);
        setShowInfo(searchedPoke);
      }
    };
  
    searchIn();
  }, [debouncedSearch]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar search={search} setSearch={setSearch} />
        
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* {console.log({ showInfo, pokeInfo, offset })} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {showInfo.map((poke) => (
            <PokeCard
              key={poke.id}
              pokemon={poke}
              onClick={() => navigate(`/pokemon/${poke.name}`)}
            />
          ))}
        </div>
        {!isSearching && (
          <button
            disabled={loading}
            className="bg-yellow-400 my-5 mx-auto text-white font-bold text-xl 
              px-4 py-2 rounded-xl shadow-2xl hover:-translate-y-1 "
            onClick={() => setOffset((prev) => prev + 10)}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
