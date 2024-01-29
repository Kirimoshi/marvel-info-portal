const charInfoComicsItem = (props) => {
  const { name, resourceURI } = props.comic;
  const _apiKey = "apikey=e5ba354cb11a649b859b238e265b95f9";

  return (
    <a
      // href={`${resourceURI}?${_apiKey}`}
      style={{ display: "block" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <li className="char__comics-item">{name}</li>
    </a>
  );
};

export default charInfoComicsItem;
