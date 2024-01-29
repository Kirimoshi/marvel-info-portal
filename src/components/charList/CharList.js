import "./charList.scss";
import CharListItem from "../charListItem/CharListItem";
import { useEffect, useRef, useState } from "react";
import useMarvelService from "../../services/MarvelService";

// TODO Implement loading and error states

const CharList = (props) => {
  const [charsList, setCharsList] = useState([]);
  const [newCharactersLoading, setNewCharactersLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charsEnded, setCharsEnded] = useState(false);
  // const itemRefs = useRef([]);

  const { getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    setNewCharactersLoading(true);
    getAllCharacters(offset).then(onCharsLoaded);
  };

  const onCharsLoaded = (newCharsList) => {
    let ended = false;
    if (newCharsList.length < 9) {
      ended = true;
    }

    setCharsList((charsList) => [...charsList, ...newCharsList]);
    setNewCharactersLoading(false);
    setOffset((offset) => offset + newCharsList.length);
    setCharsEnded(ended);
  };

  // const focusOnCharCard = (id) => {
  //   itemRefs.current.forEach((card) =>
  //     card.classList.remove("char__item_selected")
  //   );
  //   itemRefs.current[id].classList.add("char__item_selected");
  //   itemRefs.current[id].focus();
  //   props.onCharSelected(id);
  // };

  const { onCharSelected } = props;
  const charListElements = charsList.map((item) => {
    const { id } = item;
    const isSelected = props.selectedChar === id;
    return (
      <CharListItem
        key={id}
        // ref={(elem) => (itemRefs.current[id] = elem)}
        selected={isSelected}
        {...item}
        onCharSelected={() => onCharSelected(id)}
        // focusOnCharCard={() => focusOnCharCard(id)}
      />
    );
  });

  return (
    <div className="char__list">
      <ul className="char__grid">{charListElements}</ul>
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={newCharactersLoading}
        style={{ display: charsEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
