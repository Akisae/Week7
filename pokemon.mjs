import fs from 'fs';
import fetch from 'node-fetch';
//#region Cache
const CACHE_FILE = './pokemonCache.json'

let pokemonCache = new Map();
if(fs.existsSync(CACHE_FILE)){
    const savedCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    savedCache.forEach((key, value) => pokemonCache.set(key, value));
    console.log(`Loaded ${pokemonCache.size} Pokémon from cache.`);
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

//console.log(await fetchAllPokemonNames());
//#region Details
const fetchPokemonDetails = async (url) => {
    if (pokemonCache.has(url)) {
        return pokemonCache.get(url); // Return cached data
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokemonData = { name: data.name, height: data.height };

        // Save to cache
        pokemonCache.set(url, pokemonData);
        fs.writeFileSync(CACHE_FILE, JSON.stringify([...pokemonCache]), 'utf-8');

        return pokemonData;
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
    }
};
//#endregion
//#region 1.
const findTallestPokemon = async () => {
    const allPokemon = await fetchAllPokemonNames();
    const allDetails = await Promise.all(allPokemon.map(p => fetchPokemonDetails(p.url)));
    const maxHeight = Math.max(...allDetails.map(p => p.height));
    const tallestPokemon = allDetails.filter(p => p.height === maxHeight);
    console.log("What is the tallest pokemon?");
    console.log(`Tallest Pokémon (height: ${maxHeight} decimetres):`);
    tallestPokemon.forEach(p => console.log(`- ${p.name}`));

    return tallestPokemon;
};

await findTallestPokemon();