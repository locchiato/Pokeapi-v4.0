import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_POKEMON } from "../utils/apis";
import "../styles/Pokemon.css";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMoves, setShowMoves] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams(); // Parametro de la url
  const filterMoves = pokemon?.moves?.slice(0, 12);

  const handleMoves = () => {
    setShowMoves(!showMoves);
  };

  useEffect(() => {
    /* ESPACIO DE TRABAJO
    1) hacer un fetch con axios de la  API_POKEMON y el id
    2) hacer un setPokemon con la data
    3) Tener un catch para setear el error
    4) Cambiar el estado del loading
    */
    const fetchData = async () => {
      await axios
        .get(API_POKEMON + `${id}`)
        .then((data) => {
          setPokemon(data.data);
          setLoading(false);
        })
        .catch((e) => setErrorMessage(e));
    };
    fetchData();
    return () => {
      // Este return es para limpiar el componente al desmontar
      // Limpiar los estados
    };
  }, [id]);

  if (loading) return <p>Loading Data...</p>;
  return (
    <div className="pokemon_container">
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
                {pokemon.abilities.map((ability) => (
                  <p id="array" key={ability.ability.name}>
                    {ability.ability.name}
                  </p>
                ))}
              </div>
              <div className="fila">
                <h5>Types:</h5>
                {pokemon.types.map((type) => (
                  <p id="array" key={type.type.name}>
                    {type.type.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="image">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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

export default Pokemon;
