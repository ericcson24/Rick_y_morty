// routes/id.tsx
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PersonajeDetallado from "../../components/PersonajeDetallado.tsx";
import { Character } from "../index.tsx";


type Data = {
  character: Character;
  episodes: string[];
};

const getCharacter = async (id: string): Promise<Data> => {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const res = await fetch(url);
  const character: Character = await res.json();

  // Si `episode` es una cadena, la convertimos en un array de un solo elemento.
  const episodesUrls = Array.isArray(character.episode) ? character.episode : [character.episode];

  // Obtener los nombres de los episodios
  const episodes = await getEpisodes(episodesUrls);
  
  return { character, episodes };
};

// Función para obtener nombres de episodios
const getEpisodes = async (episodeUrls: string[]): Promise<string[]> => {
  if (!episodeUrls || episodeUrls.length === 0) return [];
  
  const episodePromises = episodeUrls.map(url => fetch(url).then(res => res.json()));
  const episodesData = await Promise.all(episodePromises);
  return episodesData.map(ep => ep.name); // Extraemos solo el nombre del episodio
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { id } = ctx.params;
    const { character, episodes } = await getCharacter(id);
    return ctx.render({ character, episodes });
  },
};

const Page = (props: PageProps<Data>) => {
  const { character, episodes } = props.data;
  return <PersonajeDetallado character={character} episodes={episodes} />;
};

export default Page;
