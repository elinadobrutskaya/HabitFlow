import React, { useState } from 'react'
import style from './style.module.scss'
import Button from '../Button'
import Title from '../Title'

interface HabitModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: { title: string; category: string; color: string }) => void
}

const HabitModal: React.FC<HabitModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('#589616')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onCreate({ title: title.trim(), category, color })
      setTitle('')
      setCategory('')
      onClose()
    }
  }

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <Title size="md">New Habit</Title>
        <form onSubmit={handleSubmit} className={style.modalForm}>
          <input
            type="text"
            placeholder="Name of habit (yoga, reading, etc.)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category of habit (health, education, etc.)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className={style.colorRow}>
            <label>Color: </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className={style.modalActions}>
            <Button variant="cancel" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="secondary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HabitModal
