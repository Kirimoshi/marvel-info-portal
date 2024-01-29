import "./charListItem.scss";

const CharListItem = (props) => {
  const updateStateSelected = () => {
    props.onCharSelected();
  };

  const isImgNotFound = () => {
    const _THUMBNAIL_NOT_FOUND_URL =
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    return props.thumbnail === _THUMBNAIL_NOT_FOUND_URL
      ? { objectFit: "contain" }
      : { objectFit: "cover" };
  };

  const { name, thumbnail, id, selected } = props;
  let classList = "char__item";
  if (selected) {
    classList += " char__item_selected";
  }

  return (
    <li className={classList} onClick={updateStateSelected}>
      <img src={thumbnail} style={isImgNotFound()} alt={name} />
      <div className="char__name">{name}</div>
    </li>
  );
};
export default CharListItem;
