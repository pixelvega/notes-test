import { useState } from 'react';
import './App.css';

type Item = {
  text: string
  id: string
  selected: boolean
}

function App() {
  const [items, setItems] = useState<Item[] | null>([])
  const [prevActionItems, setPrevActionItems] = useState<Item[] | null>([])

  const handleAddNote = () => {
    const note = window.prompt('NOTA')
    if (!note) return;
    setItems((prevItems: any) => {
      setPrevActionItems(prevItems);
      const newItem = { text: note, id: new Date().toString(), selected: false }
      return [
        ...prevItems, newItem
      ]
    })
  }

  const handleDeleteNotes = () => {
    setItems((prevItems: any) => {
      setPrevActionItems(prevItems);
      const newState = prevItems.filter((item: Item) => !item.selected);
      return [
        ...newState
      ]
    })
  }

  let timer: any = 0;
  let delay = 500;
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
    <div className="App">
      <header className="App-header">
        <h1>NOTAS</h1>
      </header>
      <main>
        <section>
          <div className="App-actions">
            <button
              className={`btn-box primary`}
              onClick={handleAddNote}>AÑADIR</button>
            <button
              className={`btn-box delete`}
              onClick={handleDeleteNotes}>ELIMINAR</button>
            <button
              className={`btn-box action`}
              onClick={handleUndoAction}>DESHACER</button>
          </div>
          {(!items?.length) ? null :
            <ul className="List-block">
              <>
                {items.map((item: Item) => {
                  return (
                    <li key={item.id} className="List-block__item">
                      <div className={`List-block__item-ghost ${item.selected ? 'active' : ''}`}
                        onClick={() => handleClick(item.id)}
                        onDoubleClick={() => handleDoubleClick(item.id)}
                      ></div>
                      <div className={`List-block__item-input ${item.selected ? 'active' : ''}`}>
                        <label htmlFor={item.id}>
                          <input type="checkbox"
                            id={item.id}
                            checked={item.selected}
                            readOnly={true}
                          />
                          <span>{item.text}</span>
                        </label>
                      </div>
                    </li>
                  )
                })}
              </>
            </ul>
          }
        </section>
      </main>
    </div>
  );
}

export default App;
