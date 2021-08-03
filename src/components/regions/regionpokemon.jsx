import React, {useState,useEffect} from 'react';
import PokeCards from '../pokecards/pokecards';
import axios from 'axios';
import './regionpokemon.scss'

const RegionPokemon = ({pokemon}) => {

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
    const [pokemonName, setPokemonName] = useState('');
    

    useEffect(() => {
        axios.get(urlForKanto)
        .then(res => {
            setKantoPokemon(res.data.results.map((pokemon)=> {
                return pokemon.name;
                
            }))
        })

        axios.get(urlForJohto)
        .then(res => {
            setJohtoPokemon(res.data.results.map((pokemon)=>{
                return pokemon.name;
            }))
        })

        axios.get(urlForHoenn)
        .then(res => {
            setHoennPokemon(res.data.results.map((pokemon)=>{
                return pokemon.name;
            }))
        })

        axios.get(urlForSinnoh)
        .then(res => {
            setSinnohPokemon(res.data.results.map((pokemon)=>{
                return pokemon.name;
            }))
        })

        axios.get(urlForUnova)
        .then(res => {
            setUnovaPokemon(res.data.results.map((pokemon)=>{
                return pokemon.name;
            }))
        })

        
    },[]);


    const setNames = (event) => {
        setPokemonName(event.target.value);
    }
    const updatePokemonName = (name) => {
        if(!name) return "";
        let lowerLetterString = name.toLowerCase();
        let firstCharacter = lowerLetterString.charAt(0);

        let upperFirstCharacter = firstCharacter.toUpperCase();
        let remainingString = lowerLetterString.slice(1);

        return upperFirstCharacter + remainingString;
    }
    
    return (
        <div style = {{fontFamily:'Iceland', fontSize:24}} className = 'dropdownSpaces'>
            <select style = {{width: 100, margin: 30}} name = 'regions' id = 'regions' onChange = {setNames}>
                <option value = '' >Kanto</option>
                {kantoPokemon.map((option,index) => 
                <option 
                key={index} value={option}>{updatePokemonName(option)} 
                </option>)
                }
            </select>
            <select style = {{width: 100, margin: 30}} name = 'regions' id = 'regions' onChange = {setNames}>
                <option value = '' >Johto</option>
                {johtoPokemon.map((option,index) => {
                    return (
                    <option key = {index} value = {option}>
                        {updatePokemonName(option)}
                    </option>
                    );
                })}
            </select>
            <select style = {{width: 100, margin: 30}} name = 'regions' id = 'regions' onChange = {setNames}>
                <option value = '' >Hoenn</option>
                {hoennPokemon.map((option,index)=> {
                    return (
                    <option key = {index} value = {option} >
                        {updatePokemonName(option)}
                    </option>
                    );
                })}
            </select>
            <select style = {{width: 100, margin: 30}} name = 'regions' id = 'regions' onChange = {setNames}>
                <option value = '' >Sinnoh</option>
                {sinnohPokemon.map((option,index)=> {
                    return (
                    <option key = {index} value = {option}>
                        {updatePokemonName(option)}
                    </option>
                    );
                })}
            </select>
            <select style = {{width: 100, margin: 30}} name = 'regions' id = 'regions' onChange = {setNames}>
                <option value = '' >Unova</option>
                {unovaPokemon.map((option,index)=> {
                    return (
                        <option key = {index} value = {option}>
                            {updatePokemonName(option)}
                        </option>
                    );
                })}
                
            </select>
            
            <PokeCards pokemon = {pokemonName} />
        </div>
    );
}

export default RegionPokemon;