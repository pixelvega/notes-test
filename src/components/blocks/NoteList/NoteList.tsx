import React, { useState } from "react";
import NoteItem from "../NoteItem/NoteItem";
import { Item } from '../../../Types/Types';
import './NoteList.css';

interface IProps {
  items: Item[] | null
  handleClick: (id: string) => void
  handleDoubleClick: (id: string) => void
}

const NoteList: React.FC<IProps> = ({ items, handleClick,
  handleDoubleClick }) => {

  return (
    <div className="NoteList">
      {(!items?.length) ?
        <p className="message"><em>Añade una nota.</em></p>
        :
        <ul className="List-block">
          {items?.map((item: Item) => {
            return (
              <NoteItem
                key={item.id}
                item={item}
                handleClick={handleClick}
                handleDoubleClick={handleDoubleClick}
              />
            )
          })}
        </ul>
      }
    </div>
  )

}

export default NoteList;