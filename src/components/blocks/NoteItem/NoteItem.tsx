import React from "react";
import { Item } from '../../../Types/Types';
import './NoteItem.css';

interface IProps {
  item: Item,
  handleClick: (id: string) => void
  handleDoubleClick: (id: string) => void
}

const NoteItem: React.FC<IProps> = ({ item, handleClick,
  handleDoubleClick }) => {
  const { id, selected, text } = item;

  return (
    <li key={id} className="List-block__item">
      <div className={`List-block__item-ghost ${selected ? 'active' : ''}`}
        onClick={() => handleClick(id)}
        onDoubleClick={() => handleDoubleClick(id)}
      ></div>
      <div className={`List-block__item-input ${selected ? 'active' : ''}`}>
        <label htmlFor={id}>
          <input type="checkbox"
            id={id}
            checked={selected}
            readOnly={true}
          />
          <span>{text}</span>
        </label>
      </div>
    </li>
  )
}

export default NoteItem;
