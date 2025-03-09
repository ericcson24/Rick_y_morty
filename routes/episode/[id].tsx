import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import EpisodioDetallado from "../../components/EpisodioDetallado.tsx";
import { Character } from "../index.tsx";
import { Episode } from "../index.tsx";





type Data = {
  episode: Episode;
  characters: Character[]; // Ahora realmente será un array de objetos Character
};

const getEpisode = async (id: string): Promise<Data> => {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  const res = await fetch(url);
  const episode: Episode = await res.json();

  // Obtener los personajes completos (no solo las URLs)
  const characters = await getCharacters(episode.characters);

  return { episode, characters };
};

// 🔹 Función para obtener los personajes completos (name + image)
const getCharacters = async (characterUrls: string[]): Promise<Character[]> => {
  if (!characterUrls || characterUrls.length === 0) return [];

  const characterPromises = characterUrls.map(url => fetch(url).then(res => res.json()));
  const charactersData = await Promise.all(characterPromises);

  return charactersData.map((char) => ({
    id: char.id,
    name: char.name,
    image: char.image,
    status: char.status,  // 🔹 Agregamos el estado del personaje
    species: char.species,  // 🔹 Agregamos la especie del personaje
    gender: char.gender,  // 🔹 Agregamos el género del personaje
    episode: char.episode,  // 🔹 Agregamos los episodios en los que aparece
  }));
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { id } = ctx.params;
    const { episode, characters } = await getEpisode(id);
    return ctx.render({ episode, characters });
  },
};

const Page = (props: PageProps<Data>) => {
  const { episode, characters } = props.data;
  return <EpisodioDetallado episode={episode} characters={characters} />;
};

export default Page;
