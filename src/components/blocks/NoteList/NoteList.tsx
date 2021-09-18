import React from "react";
import NoteItem from "../NoteItem/NoteItem";
import { Item } from '../../../Types/Types';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd';
import './NoteList.css';

interface IProps {
  items: Item[] | null
  setItems: React.Dispatch<React.SetStateAction<Item[] | null>>
  handleClick: (id: string) => void
  handleDoubleClick: (id: string) => void
}

const NoteList: React.FC<IProps> = ({ items, handleClick,
  handleDoubleClick, setItems }) => {

  const reorderItems = (list: Item[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return
    }
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    setItems((prevState: Item[] | any) => {
      return reorderItems(prevState, source.index, destination.index)
    })
  }

  return (
    <div className="NoteList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {(!items?.length) ?
          <p className="message"><em>Añade una nota.</em></p>
          :
          <Droppable droppableId="NoteList">
            {(droppableProvided) => (
              <ul
                className="List-block"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {items?.map((item: Item, index: number) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(draggableProvided) => (
                      <div
                        className="List-block__item--wrapper"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <NoteItem
                          item={item}
                          handleClick={handleClick}
                          handleDoubleClick={handleDoubleClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
        }
      </DragDropContext>
    </div>
  )

}

export default NoteList;