import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PokeCards = ({pokemon}) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImage, setPokemonImage] = useState('');
    const [pokemonShinyImage, setPokemonShinyImage] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonMoves, setPokemonMoves] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [pokemonStatNames, setPokemonStatNames] = useState([]);
    const [pokemonStats, setPokemonStats] = useState([]);
    const [pokemonId, setPokemonId] = useState(0);

    useEffect(() => {
        axios.get(url.concat(`${pokemon}`))
        .then(res => {
            console.log(res);
        })


        axios.get(url.concat(`${pokemon}`))
        .then(res => {
            setPokemonName(pokemon? res.data.name : null);
            setPokemonId(pokemon? res.data.id : null);
            setPokemonImage( pokemon ? res.data.sprites.front_default : null);
            setPokemonShinyImage(pokemon ? res.data.sprites.front_shiny : null);  
            setPokemonTypes(!pokemon ? null : res.data.types.map((pokemon,index)=>{
                return pokemon.type.name;
            }))
            setPokemonMoves(!pokemon ? null : res.data.moves.map((pokemon,index)=> {
                return pokemon.move.name;
            }))
            setPokemonAbilities(!pokemon ? null : res.data.abilities.map((pokemon,index)=> {
                return pokemon.ability.name;
            }))
            setPokemonStats(!pokemon ? null :res.data.stats.map((pokemon,index)=> {
                return pokemon.base_stat;
            }))
            setPokemonStatNames(!pokemon ? null :res.data.stats.map((pokemon,index)=>{
                return pokemon.stat.name;
            }))
            
        })
    },[pokemon])

    const capitalizeName = (name) => {
        if(!name) return "";
        let lowerLetterString = name.toLowerCase();
        let firstCharacter = lowerLetterString.charAt(0);

        let upperFirstCharacter = firstCharacter.toUpperCase();
        let remainingString = lowerLetterString.slice(1);

        return upperFirstCharacter + remainingString;
    }

    return(
        <>
        <div>
            <div>
                <img src = {pokemonImage} alt = {pokemon} />
                <img src = {pokemonShinyImage} alt = {pokemon} />
                </div>
            
            {!pokemonId ? null :<div>
                {pokemonId}. {capitalizeName(pokemonName)}
            </div>}
            

            {!pokemonTypes ? null :<div>
                Type: {!pokemonTypes ? null :pokemonTypes.map((type,index)=>{
                  return  <span key = {index}> {capitalizeName(type)} </span>
                })}
            </div>}

            {!pokemonAbilities ? null :<div>
                Abilities: {!pokemonAbilities ? null :pokemonAbilities.map((ability,index)=> {
                    return <span key = {index}> {capitalizeName(ability)} </span>
                })}
            </div>}

            {!pokemonMoves ? null :<div>
                Moves: {pokemonMoves.map((move,index)=> {
                    return <span key = {index}> {capitalizeName(move)}  </span>
                })}
            </div>}
            
            {!pokemonStatNames ? null :<div>
                {pokemonStatNames.map((names,index)=>{
                    return <span key = {index}> {names} </span>
                })}
            </div>}

            {!pokemonStats ? null :<div>
                {
                    pokemonStats.map((stats,index)=> {
                        return <span key = {index}> {stats}  </span>
                    })
                }
            </div>}

        </div>
            
        </>
    )
}

export default PokeCards;