import "./charInfo.scss";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import CharInfoComicsItem from "../charInfoComicsItem/charInfoComicsItem";
import useMarvelService from "../../services/MarvelService";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.charId]);
  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    getCharacter(charId).then((char) => setChar(char));
  };

  const isImgNotFound = (thumbnail) => {
    const _THUMBNAIL_NOT_FOUND_URL =
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    return thumbnail === _THUMBNAIL_NOT_FOUND_URL
      ? { objectFit: "contain" }
      : { objectFit: "cover" };
  };

  let thumbnail;
  if (char !== null) {
    thumbnail = char.thumbnail;
  }
  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? (
    <View char={char} style={isImgNotFound(thumbnail)} />
  ) : null;
  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
};

const View = (props) => {
  const { name, description, thumbnail, homepage, wiki, comics } = props.char;
  const { style } = props;
  const comicElements = comics.map((comic) => {
    return <CharInfoComicsItem key={comic.name} comic={comic} />;
  });
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={style} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__descr">{description}</div>
          {/*<div className="char__btns">*/}
          {/*  <a href={homepage} className="button button__main">*/}
          {/*    <div className="inner">homepage</div>*/}
          {/*  </a>*/}
          {/*  <a href={wiki} className="button button__secondary">*/}
          {/*    <div className="inner">Wiki</div>*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicElements.length !== 0
          ? comicElements
          : "There are no comics for this character"}
      </ul>
    </>
  );
};
export default CharInfo;
