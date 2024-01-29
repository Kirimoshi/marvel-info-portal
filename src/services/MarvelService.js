import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey="; // ADD YOUR PRIVATE API KEY UPON REGISTERING AT MARVEL DEV PORTAL
  const _baseCharacterOffset = 210;

  const getAllCharacters = async (offset = _baseCharacterOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map((char) => {
      return _transformCharacter(char);
    });
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  const _transformCharacter = (char) => {
    const { path, extension } = char.thumbnail;
    let description = char.description;
    if (description.length === 0) {
      description = "There is no description for this character available yet.";
    }
    description =
      description.length > 210
        ? `${description.slice(0, 210)}...`
        : description;
    return {
      name: char.name,
      description: description,
      thumbnail: `${path}.${extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items.slice(0, 10),
    };
  };

  return { loading, error, getCharacter, getAllCharacters };
};

export default useMarvelService;
