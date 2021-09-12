import { useState } from 'react';
import NoteActions from '../../blocks/NoteActions/NoteActions';
import NoteList from '../../blocks/NoteList/NoteList';
import { Item } from '../../../Types/Types';
import './Notes.css';

function Notes() {
  const [items, setItems] = useState<Item[] | null>([])
  const [prevActionItems, setPrevActionItems] = useState<Item[] | null>(null)

  const handleAddNote = () => {
    const note = window.prompt('NOTA')
    if (!note) return;
    setItems((prevItems: any) => {
      setPrevActionItems(prevItems);
      const newItem = { text: note, id: Date.now(), selected: false }
      return [
        ...prevItems, newItem
      ]
    })
  }

  const handleDeleteNotes = () => {
    setItems((prevItems: any) => {
      setPrevActionItems(prevItems);
      const newState = prevItems.filter((item: Item) => !item.selected);
      return newState;
    })
  }

  let timer: any = 0;
  const delay = 500;
  let prevent = false;
  const doClickAction = (itemId: string) => {
    setItems((prevItems: any) => {
      setPrevActionItems(prevItems);
      const newState = prevItems.map((item: Item) => {
        let newItem = { ...item };
        if (item.id === itemId) {
          newItem.selected = !newItem.selected;
        }
        return newItem;
      })
      return [
        ...newState
      ]
    })
  }

  const doDoubleClickAction = (itemId: string) => {
    setItems((prevItems: any) => {
      setPrevActionItems(prevItems);
      const newState = prevItems.filter((item: Item) => item.id !== itemId);
      return [
        ...newState
      ]
    })
  }

  const handleClick = (itemId: string) => {
    timer = setTimeout(function () {
      if (!prevent) {
        doClickAction(itemId);
      }
      prevent = false;
    }, delay);
  }

  const handleDoubleClick = (itemId: string) => {
    clearTimeout(timer);
    prevent = true;
    doDoubleClickAction(itemId);
  }

  const handleUndoAction = () => {
    setItems(prevActionItems);
  }

  return (
    <div className="Notes">
      <header className="Notes-header">
        <h1>NOTAS</h1>
      </header>
      <main>
        <section>
          <NoteActions
            handleAddNote={handleAddNote}
            handleDeleteNotes={handleDeleteNotes}
            handleUndoAction={handleUndoAction}
            prevActionItems={prevActionItems}
          />
          <NoteList
            items={items}
            handleClick={handleClick}
            handleDoubleClick={handleDoubleClick}
          />
        </section>
      </main>
    </div>
  );
}

export default Notes;
