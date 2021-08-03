import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './pokecards.scss';

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

    const getTypeColors = (map) => {
        map.set('water','cyan');
        map.set('normal','white');
        map.set('fire','orange');
        map.set('grass','green');
        map.set('electric','yellow');
        map.set('ice','powderblue');
        map.set('fighting','darkred');
        map.set('poison','purple');
        map.set('ground','brown');
        map.set('flying','turquoise');
        map.set('psychic','pink');
        map.set('bug','gold');
        map.set('rock','maroon');
        map.set('ghost','lavender');
        map.set('dark','darkgray');
        map.set('dragon','indigo');
        map.set('steel','sienna');
        
        return map;
    }

    const capitalizeName = (name) => {
        if(!name) return "";

        let lowerLetterString = name.toLowerCase();
        let firstCharacter = lowerLetterString.charAt(0);

        let upperFirstCharacter = firstCharacter.toUpperCase();
        let remainingString = lowerLetterString.slice(1);
        let appendedString = '';
        appendedString = upperFirstCharacter + remainingString;
        let finalAppendedString = ''
        let finalString = '';

        for(let c of appendedString){
            if(c === '-'){
                let words = appendedString.split('-');
                for(let word of words){
                    let lowerLetterString = word.toLowerCase();
                    let firstCharacter = lowerLetterString.charAt(0);

                    let upperFirstCharacter = firstCharacter.toUpperCase();
                    let remainingString = lowerLetterString.slice(1);

                    finalString = upperFirstCharacter + remainingString;
                    finalAppendedString += finalString;
                    finalAppendedString += ' '
                    
                }
                finalAppendedString.slice(0,finalAppendedString.length-1);
                return finalAppendedString;
            }
        }
        return appendedString;
    }

    const fullCapitalize = (name) => {
        if(!name) return "";
        return name.toUpperCase();
    }
    let map = new Map();
    map = getTypeColors(map);
    return(
        <>
        <div>
            <div>
                <img className = 'pokemonImages' src = {pokemonImage} alt = {pokemon} />
                <img className = 'pokemonImages' src = {pokemonShinyImage} alt = {pokemon} />
                </div>
            
            {!pokemonId ? null :<div>
                <b>{pokemonId}. {capitalizeName(pokemonName)}</b>
            </div>}
            

            {!pokemonTypes ? null :<div>
                <b>Type:</b> {!pokemonTypes ? null :pokemonTypes.map((type,index)=>{
                  return  <span key = {index} style = {{color: map.get(type),
                    border: "0px solid black", borderRadius : 5, margin: 5}}> {capitalizeName(type)} </span>
                })}
            </div>}

            {!pokemonAbilities ? null :<div style = {{border: "0px solid black",
              borderRadius: 10}}>
                <b>Abilities:</b> {!pokemonAbilities ? null :pokemonAbilities.map((ability,index)=> {
                    return <span key = {index}> {capitalizeName(ability)} </span>
                })}
            </div>}

            
            {!pokemonMoves ? null :<div style = {{border: "1px solid black",
             backgroundColor:'springgreen', borderRadius: 10, margin:5}}>
                <b>Moves: </b> {pokemonMoves.map((move,index)=> {
                    return <span key = {index} style = {{marginLeft: 10}}> {capitalizeName(move)}  </span>
                })}
            </div>}
            
            {!pokemonStats ? null :<div style = {{margin:10}}><b>Stats:</b>
                <table style = {{border: "1px solid black", marginLeft:'auto', marginRight:'auto',
            backgroundColor:'violet', borderRadius:5 }}>
                    <thead >
                        
                            {!pokemonStatNames ? null :<tr>
                                {pokemonStatNames.map((names,index)=> {
                                    return <td key = {index}  style = {{margin:15,align: 'center'}}>
                                        {fullCapitalize(capitalizeName(names))}
                                    </td> 
                                })}
                                </tr>}
                        
                        </thead>
                        <tbody>
                        <tr>
                        
                            {!pokemonStats ? null : <>
                                {pokemonStats.map((stats,index)=> {
                                    return <td style = {{
                                margin: 10}} key = {index}> {stats} </td>
                                })}
                                </>}
                        
                        </tr>
                        </tbody>
                        
                        
                    
                </table>
            </div>}

        </div>
            
        </>
    )
}

export default PokeCards;