import { useTheme } from '../../Contexts/ThemeContext'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="theme" onClick={toggleTheme}>
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
    </Button>
  )
}

export default ThemeToggle
