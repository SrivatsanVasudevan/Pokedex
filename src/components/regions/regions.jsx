import React, {useState,useEffect} from 'react';
import PokeCards from '../pokecards/pokecards';
import axios from 'axios';


const Regions = () => {


    const urlForKanto = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    const urlForJohto = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151';
    const urlForHoenn = 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251';
    const urlForSinnoh = 'https://pokeapi.co/api/v2/pokemon?limit=107&offset=386';
    const urlForUnova = 'https://pokeapi.co/api/v2/pokemon?limit=156&offset=493';
    const [kantoPokemon, setKantoPokemon] = useState([]);
    const [johtoPokemon, setJohtoPokemon] = useState([]);
    const [hoennPokemon, setHoennPokemon] = useState([]);
    const [sinnohPokemon, setSinnohPokemon] = useState([]);
    const [unovaPokemon, setUnovaPokemon] = useState([]);
    
    const [pokemonNames, setPokemonNames] = useState([]);
    
    useEffect(() => {
        axios.get(urlForKanto)
        .then((res) => {
            return setPokemonNames(res.data.results.map((pokemon,index)=>{
               return(
                <div key = {index}>
                    {pokemon.name}
                </div>
               ); 
            }))
            
        })

        
        axios.get(urlForKanto).then(res => {
            setKantoPokemon(res.data.results.map((pokemon,index)=>{
                return (
                    <div key = {index}>
                        {pokemon.name}
                    </div>
                )
            }))
        })
        axios.get(urlForJohto).then(res => {
            setJohtoPokemon(res.data.results.map((pokemon,index)=>{
                return(
                    <div key = {index}>
                        {pokemon.name}
                    </div>
                );
            }))
        });
        axios.get(urlForHoenn).then(res => {
            setHoennPokemon(res.data.results.map((pokemon,index)=> {
                return (
                    <div key = {index}>
                        {pokemon.name}
                    </div>
                );
            }))
        });
        axios.get(urlForSinnoh).then(res => {
            setSinnohPokemon(res.data.results.map((pokemon,index) => {
                return (
                    <div key = {index}>
                        {pokemon.name}
                    </div>
                );
            }))
        });
        axios.get(urlForUnova).then(res => {
            setUnovaPokemon(res.data.results.map((pokemon,index) => {
                return(
                    <div key = {index}>
                        {pokemon.name}
                    </div>
                );
            }))
        });
    }
    ,[]);
    const displayKantoPokemon = () => {
        setPokemonNames(kantoPokemon);
    }

    const displayJohtoPokemon = () => {
        setPokemonNames(johtoPokemon);
    }

    const displayHoennPokemon = () => {
        setPokemonNames(hoennPokemon);
    }

    const displaySinnohPokemon = () => {
        setPokemonNames(sinnohPokemon);
    }

    const displayUnovaPokemon = () => {
        setPokemonNames(unovaPokemon);
    }
    
    return(
        <>
        <div>
            <button onClick = {displayKantoPokemon} value = 'Kanto'> Kanto </button>
            <button onClick = {displayJohtoPokemon} value = 'Johto'> Johto </button>
            <button onClick = {displayHoennPokemon} value = 'Hoenn'> Hoenn </button>
            <button onClick = {displaySinnohPokemon} value = 'Sinnoh'> Sinnoh </button>
            <button onClick = {displayUnovaPokemon} value = 'Unova'> Unova </button>
        </div>
        <div>
            <PokeCards pokemon = {pokemonNames}/>
        </div>
        
        </>
        
    )
}

export default Regions;