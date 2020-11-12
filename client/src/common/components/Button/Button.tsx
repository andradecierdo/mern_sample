import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import './styles.css'

interface IProps {
  children: ReactNode
  disabled?: boolean
  onClick?: (event: React.MouseEvent) => void | Promise<void>
  size?: string
  style?: string
  title?: string
  type?: 'submit' | 'reset' | 'button'
}

const Button: FunctionComponent<IProps> = (props: IProps): ReactElement => {
  const { children, disabled, onClick, size, style, title, type } = props
  const className = `${style || 'default'} ${size || ''} ${(disabled && 'disabled') ||
    ''}`

  return (
    <button
      className={className}
      disabled={disabled || false}
      onClick={onClick}
      title={title || ''}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
