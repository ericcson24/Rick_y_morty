import { FunctionComponent } from "preact";
import { Episode } from "../routes/index.tsx";
import { Character } from "../routes/index.tsx";

type Props = {
  episode: Episode;
  characters: Character[]; // Ahora almacenamos una lista de personajes con nombre e imagen
};

const EpisodioDetallado: FunctionComponent<Props> = ({ episode, characters }) => {
  return (
    <div className="detalle-episodio">
      <h1>{episode.name}</h1>
      <p><strong>Fecha de emisión:</strong> {episode.air_date}</p>
      <p><strong>Código de episodio:</strong> {episode.episode}</p>
      
      
      <div id="personajes">
      <h2>Personajes en este episodio:</h2>
      <ul>
        {characters.map((character) => (
            
          <li key={character.id}>
            <a href={`http://localhost:8000/character/${character.id}`}>
              <button className="boton-episodio">
                {character.name}
                <img src={character.image} width={100} />
              </button>
            </a>
          </li>
        ))}
      </ul>
      </div>

      <a href="/"><button className="boton-volver">Volver al inicio</button></a>
    </div>
  );
};

export default EpisodioDetallado;
