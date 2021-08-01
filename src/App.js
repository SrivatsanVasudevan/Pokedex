import './App.css';
import Heading from './components/heading/heading';
import Regions from './components/regions/regions';
import RegionPokemon from './components/regions/regionpokemon';


function App() {
  return (
    <div className="App">
      <Heading />
      <RegionPokemon />
    </div>
  );
}

export default App;
