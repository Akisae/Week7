import fs from 'fs';
import fetch from 'node-fetch';
//#region Cache
const CACHE_FILE = './pokemonCache.json'

let pokemonCache = new Map();
if(fs.existsSync(CACHE_FILE)){
    const savedCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    savedCache.forEach((key, value) => pokemonCache.set(key, value));
    console.log('loaded ${pokemonCache.size} Pokemon from the cache.');
}
//#endregion
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