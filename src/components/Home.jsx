import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_POKEMONS } from "../utils/apis";
import "../styles/Home.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    /* ESPACIO DE TRABAJO
    1) hacer un fetch con axios de la  API_POKEMONS
    2) hacer un setPokemons con el arreglo de los pokemons en results
    3) Tener un catch para setear el error
    4) Cambiar el estado del loading
    */
    const fetchData = async () => {
      await axios
        .get(API_POKEMONS)
        .then((data) => {
          setPokemons(data.data.results);
          setLoading(false);
        })
        .catch((error) => setErrorMessage(error));
    };
    fetchData();
    return () => {
      // Este return es para limpiar el componente al desmontar
      // Limpiar los estados
    };
  }, []);

  if (errorMessage) return <p>{errorMessage}</p>;
  return (
    <div className="container">
      <h1>
        Bienvenido a <span className="dh">Digital</span>
        <span className="pk">Poke</span>
        <span className="dh">House</span>{" "}
      </h1>
      <div>
        <h4>Elige un pokemon para ver sus datos</h4>
        {loading ? (
          <p>Loading Data...</p>
        ) : (
          <div className="list">
            {pokemons.map((pokemon, index) => (
              <Link key={index} to={`/pokemon/${index + 1}`}>
                {pokemon.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
