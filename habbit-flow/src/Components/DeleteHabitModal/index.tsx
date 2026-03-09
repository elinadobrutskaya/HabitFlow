import React from 'react'
import style from './style.module.scss'
import Button from '../Button'

interface DeleteHabitModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

const DeleteHabitModal: React.FC<DeleteHabitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm action',
  message = 'Are you sure you want to delete this habit?',
}) => {
  if (!isOpen) return null

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={style.actions}>
          <Button variant="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteHabitModal
