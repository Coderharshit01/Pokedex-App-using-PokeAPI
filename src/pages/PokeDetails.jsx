import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { typeCss } from "../hooks/typeCss.js";
import { MoveLeft } from "lucide-react";
function PokeDetails() {
    const { name } = useParams()
    const [info, setInfo] = useState({})
    const [desc, setDesc] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {

            const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)

            const data2 = await response2.json()
            if (data2) {
                const text_entries = data2.flavor_text_entries.filter((t) => t.language.name === "en")
                const rand_desc = text_entries[Math.floor(Math.random() * text_entries.length)].flavor_text
                setDesc(rand_desc)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}  `)

            const data1 = await response1.json()

            setInfo(data1)
        }
        fetchData()
    }, [])

    return (
        <div className="min-h-screen p-8 bg-slate-200 relative">
           
            <button className="absolute top-2 left-4 text-gray-500 " onClick={()=> navigate(-1)}> <MoveLeft size={40} /></button>
            <div className="lg:h-full bg-gradient-to-br p-3 md:grid px-5 gap-6 md:grid-cols-2 from-gray-100 to-white my-5 rounded-xl shadow-[3px_2px_10px_rgba(200,0,200,1)]">
                <div className="flex flex-col items-center gap-1">
                    <img src={info?.sprites?.other?.["official-artwork"].front_default} alt="" className="bg-gray-200 object-contain
                  rounded-lg md:h-[55%] md:w-[60%] w-[85%] h-[45%] shadow-inner mx-auto md:mx-3" />
                    <div className="flex gap-3  mx-auto md:mx-0 my-2">
                        {info?.types?.map((t,i) => (
                            <p key={i} className={`${typeCss[t.type.name]} px-2 py-1.5 capitalize rounded-md `}>{t.type.name}</p>
                        ))}
                    </div>
                    <p className="italic text-xl text-center font-light font-mono my-2">"{desc ? desc : "None"}"</p>
                </div>
                <div className="flex flex-col gap-2  my-3">
                    <h2 className="capitalize font-bold text-center text-3xl bg-gradient-to-br from-pink-400 to-red-600
                 text-transparent bg-clip-text italic ">#{String(info.id).padStart(3, "0")} {name}</h2>
                    <h2 className="text-left mx-2 text-2xl 
                md:mx-7 font-bold italic text-gray-700">Stats:</h2>

                    {info?.stats?.map((s) => (
                        <div key={s.stat.name} className="flex items-center gap-2 w-full">

                            <p className="capitalize w-20">{s.stat.name == "special-attack" ? "sp-atk" : s.stat.name === "special-defense" ? "sp-def" : s.stat.name}:</p>


                            <div className="flex-1 h-6 bg-gray-200 rounded-md overflow-hidden shadow-inner">
                                <span
                                    className="block h-full bg-gradient-to-r from-green-400 to-blue-500"
                                    style={{
                                        width: `${(s.base_stat / 180) * 100}%`
                                    }}
                                ></span>
                            </div>

                            {/* Value */}
                            <p className="w-10 text-right">{s.base_stat}</p>
                        </div>
                    ))}

                                    <div className="flex gap-2 items-center">
                                        <h2 className="text-xl font-semibold  my-5">Abilities: </h2>
                                        {info?.abilities?.map((a,i) => (
                                            <div key={i} className="bg-gradient-to-br from-pink-300 to-blue-400 text-white hover:-translate-y-2 transition-all duration-150 ease-in-out cursor-pointer flex items-center px-2 rounded-xl shadow-xl capitalize h-10">
                                                {a.ability.name}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-7 items-center">
                                        <div className="flex items-center gap-2">
                                           <span className="text-xl font-semibold italic"> Height : </span> <div  className="bg-gradient-to-br from-green-300 to-blue-400 text-white hover:-translate-y-2 transition-all duration-150 ease-in-out cursor-pointer flex items-center px-2 rounded-xl shadow-xl  h-10">
                                                {info.height / 10}  m
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                           <span className="text-xl font-semibold italic"> Weight : </span> <div 
                                            className="bg-gradient-to-br from-yellow-300 to-pink-400 text-white hover:-translate-y-2 transition-all duration-150 ease-in-out cursor-pointer flex items-center px-2 rounded-xl shadow-xl  h-10">
                                                {info.weight / 10}  kg
                                            </div>
                                        </div>
                                    </div>

                </div>
            </div>
        </div>
    );
}

export default PokeDetails;