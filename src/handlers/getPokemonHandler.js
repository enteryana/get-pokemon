import dom from '../dom.js';
import data from '../data.js'

import getPokemon from '../apis/getPokemon.js';
import createPokemon from '../components/createPokemon.js';
import updatePokemonDom from '../components/updatePokemonDom.js';

const getPokemonHandler = async () => {  
    const value = Number(dom.input.value);

       // check if the value already exist 
        if (data.oldId === value) {
        return
     }

    // check if the value is valid
    const isValidId = value > 0 && value < 1280;
    if (!isValidId) {
        dom.error.className = 'error';
        dom.error.innerText = 'Please enter a valid id';
        dom.root.append(dom.error);
        return;
    }

    // remove the error message if exists
    const errorExist = dom.root.querySelector('.error');
    if (errorExist) {
        dom.error.remove();
    }

    // get data
    const pokemonData = await getPokemon(value);

    // check if the pokemon already exist
    const pokemonDomExist = dom.root.querySelector('#container');
    if (pokemonDomExist) {
        updatePokemonDom(pokemonDomExist, pokemonData);
        } else {
        const pokemonDom = createPokemon(pokemonData);
        dom.root.append(pokemonDom);
    }
};

export default getPokemonHandler;
