import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_POKEMONS } from "../utils/apis";
import "../styles/Pokemon.css";

const Search = () => {
  const [pokemon, setPokemon] = useState({});
  const [newUrl, setNewUrl] = useState("");
  const [showMoves, setShowMoves] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const filterMoves = pokemon?.moves?.slice(0, 12);

  const handleMoves = () => {
    setShowMoves(!showMoves);
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (searchInput) {
        const result = await axios(API_POKEMONS);
        const pokemons = result.data.results;
        const pokemonFinded = pokemons.find((newPokemon) =>
          newPokemon.name.toLowerCase().startsWith(searchInput.toLowerCase())
        );

        pokemonFinded
          ? setNewUrl(pokemonFinded.url)
          : setErrorMessage("Pokemon not finded");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    /* ESPACIO DE TRABAJO
    1) hacer un fetch con axios de la  newUrl recibida por parametro
    2) hacer un setPokemon con la data
    3) Tener un catch para setear el error
    4) Cambiar el estado del loading
    */
    const fetchData = async (url) => {
      console.log(url);
      console.log(newUrl);
      await axios.get(newUrl).then((data) => {
        setPokemon(data.data);
        setErrorMessage(false);
      });
    };
    /* ESPACIO DE TRABAJO
        Comprobar si nuestra newUrl existe, en caso de no existir,
        deberas devolver el siguiente estado
        setErrorMessage("¡Gotta catch 'em all!") y si existe, que llame
        a la funcion fetchData
        */
    if (newUrl) {
      fetchData(newUrl);
    } else {
      setErrorMessage("¡Gotta catch 'em all!");
    }
    return () => {
      // Este return es para limpiar el componente al desmontar
      // Limpiar los estados
    };
  }, [newUrl]);

  return (
    <div className="pokemon_container">
      <div className="buscador">
        <input
          onChange={handleChange}
          type="text"
          value={searchInput}
          placeholder="Search a pokemon..."
        />
        <button onClick={handleSubmit}>SEARCH</button>
      </div>
      {!errorMessage ? (
        <div className="pokemon_row">
          <div className="pokemon">
            <div className="datos">
              <div className="fila">
                <h5>Name:</h5>
                <p>{pokemon.name}</p>
              </div>
              <div className="fila">
                <h5>Height:</h5>
                <p>{`${pokemon.height} Feet`}</p>
              </div>
              <div className="fila">
                <h5>Weight:</h5>
                <p>{`${pokemon.weight} Kg`}</p>
              </div>
              <div className="fila">
                <h5>Abilities:</h5>
                {pokemon?.abilities?.map((ability) => (
                  <p id="array" key={ability.ability.name}>
                    {ability.ability.name}
                  </p>
                ))}
              </div>
              <div className="fila">
                <h5>Types:</h5>
                {pokemon?.types?.map((type) => (
                  <p id="array" key={type.type.name}>
                    {type.type.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="image">
              <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
              <button onClick={handleMoves}>Moves</button>
            </div>
          </div>
          {showMoves ? (
            <div className="moves">
              <h3>Moves</h3>
              <div className="list_moves">
                {filterMoves?.map((pokeMove, index) => (
                  <p key={index}>{pokeMove.move.name}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default Search;
