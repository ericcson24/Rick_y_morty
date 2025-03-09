import { FunctionComponent } from "preact/src/index.d.ts";
import { Character } from "../routes/index.tsx";

type Data = {
  results: Character
}


export const Personaje:FunctionComponent<Data> = (props) => {
    return (
        <div id="character">
            <a href={`/character/${props.results.id}`}><img src={props.results.image} width={100} /></a>
            
            <h3>{props.results.name}</h3>

        </div>
    )

}