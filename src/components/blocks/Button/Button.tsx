import React from 'react';

interface IProps {
  action: (actionParam?: any) => void
  text: string
  disabled?: boolean
  type?: string
}

const Button: React.FC<IProps> = ({ action, text, disabled = false, type = 'primary' }) => {
  return (
    <button
      className={`btn-box ${type}`}
      onClick={action}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;