import { Search } from "lucide-react";

function Navbar({search,setSearch}) {
    return (
        <div className="bg-gray-800 w-full p-3 text-white flex justify-between">
            <h2 className=" text-2xl md:text-3xl font-bold ">POKEDEX</h2>
            <div className="flex relative">
                <input
                    type="text"
                    placeholder="Search Pokemon...."
                    className="p-2 md:p-3 bg-transparent shadow-2xl border
      rounded-xl md:w-80 border-white text-white 
      focus:shadow-[0_0_15px_#00f6ff] hover:shadow-[0_0_15px_#00f6ff] 
      placeholder:text-white outline-none pr-12 md:pr-14"
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                >
                    <Search />
                </button>
            </div>

        </div>
    );
}

export default Navbar;