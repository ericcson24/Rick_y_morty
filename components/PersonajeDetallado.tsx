// components/PersonajeDetallado.tsx
import { FunctionComponent } from "preact";
import { Character } from "../routes/index.tsx";

type Props = {
  character: Character;
  episodes: string[];
};

const PersonajeDetallado: FunctionComponent<Props> = ({ character, episodes }) => {
  return (
    <div className="detalle-personaje">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} className="detalle-imagen" />
      <a href={ `http://localhost:8000/character/${character.id+1}`}>
        <button className="boton-siguiente">Siguiente personaje</button>
      </a>
      <a href={ `http://localhost:8000/character/${character.id-1 }`}>
        <button className="boton-siguiente">Anterior personaje</button>
      </a>
    
      
      <div className="detalle-texto">
        <p><strong>Género:</strong> {character.gender}</p>
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Estado:</strong> {character.status}</p>
      </div>

      <div id="episodios">
        <h2>Episodios en los que aparece</h2>

          {episodes.length > 0 ? (
            <ul>
              {episodes.map((episode, index) => (
                <li key={index}>
                  
                  
                 
                  <a href={`http://localhost:8000/episode/${index + 1}`}>
                  <button className="boton-episodio">{episode}</button>
                  </a>
                
                
                </li> 
                ))
              }
            </ul>
          ) : (<p>No hay episodios disponibles</p>
            
          )}
      </div>

      <a href="/">
        <button className="boton-volver">Volver a la lista</button>
      </a>
    </div>
  );
};

export default PersonajeDetallado;
