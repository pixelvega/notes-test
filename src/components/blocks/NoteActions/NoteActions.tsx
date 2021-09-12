import React from "react";
import { Item } from "../../../Types/Types";
import Button from '../Button/Button';
import './NoteActions.css';

interface IProps {
  handleAddNote: () => void
  handleDeleteNotes: () => void
  handleUndoAction: () => void
  prevActionItems: Item[] | null
}

const NoteActions: React.FC<IProps> = ({ handleAddNote,
  handleDeleteNotes,
  handleUndoAction, prevActionItems }) => {
  return (
    <div className="Note-actions">
      <Button
        text={"AÑADIR"}
        action={handleAddNote}
      />
      <Button
        text="ELIMINAR"
        type={`delete`}
        action={handleDeleteNotes}
      />
      <Button
        text="DESHACER"
        type={`action`}
        action={handleUndoAction}
        disabled={prevActionItems === null}
      />
    </div>
  )
}

export default NoteActions;