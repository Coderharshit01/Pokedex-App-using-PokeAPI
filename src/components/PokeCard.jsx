


function PokeCard({ pokemon,onClick }) {

    const typeCss = {
        "fire": "text-white bg-red-500 text-xl", 
        "water": "text-white bg-blue-500 text-xl",
        "grass": "text-white bg-green-500 text-xl",
         "poison": "text-white bg-purple-500 text-xl",
        "fairy": "text-white bg-pink-500 text-xl", 
        "normal": "text-white bg-gray-400 text-xl",
        "bug": "text-white bg-green-700 text-xl",
        "flying": "text-white  bg-gradient-to-br from-blue-500 to-yellow-800 text-xl",
        "electric": "text-white bg-yellow-500 text-xl", 
        "ground": "text-white bg-amber-800 text-xl",
        "fighting": "text-white bg-orange-500 text-xl",
        "psychic": "text-white bg-gradient-to-br from-pink-400 to-purple-500 text-xl",
        "rock": "text-white bg-gradient-to-br from-gray-400 to-amber-600 text-xl",
        "dragon": "text-white bg-cyan-500 text-xl", "dark": "text-white bg-gray-800 text-xl",
        "ghost": "text-white bg-gradient-to-br from-blue-200 to-blue-500 text-xl",
        "steel": "text-white bg-gradient-to-br from-gray-200 to-gray-700 text-xl",
        "ice": "text-white bg-gradient-to-br from-blue-200 to-cyan-300 text-xl"
    }
    return (
        <div className="bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-xl 
                       p-6 flex justify-center items-center flex-col gap-4 
                       hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                       onClick={onClick}>
            <div className="flex flex-col">
                <img src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    className="h-40 w-40 object-contain bg-gray-100 rounded-lg shadow-inner " />
                <span className="text-gray-500 text-xl  font-bold">#{pokemon.id}</span>
            </div>
            <h2 className="font-bold text-2xl text-gray-800/80 capitalize tracking-wide ">
                {pokemon.name}
            </h2>
            <div className="flex my-2 gap-1">
                {pokemon.types.map((t) => (
                    <p className={`${typeCss[t.type.name]} px-2 py-0.5 capitalize rounded-md`}>{t.type.name}</p>
                ))}
            </div>
        </div>
    );
}

export default PokeCard;
