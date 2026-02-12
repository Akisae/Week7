



const baseURL = "https://pokeapi.co/api/v2/"


const fetchAllPokemonNames = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
        const data = await response.json();

        console.log(`Retrieved ${data.results.length} Pokémon`);
        return data.results; // Returns array of { name, url }
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
};

console.log(await fetchAllPokemonNames());