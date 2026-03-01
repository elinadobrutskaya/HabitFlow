import style from './style.module.scss'

interface CategoriesModalProps {
  categories: string[]
}

const AllHabitsModal = ({ categories }: CategoriesModalProps) => {
  return (
    <div className={style.categoriesDropdown}>
      <p className={style.modalTitle}>Categories</p>
      <ul>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <li key={cat} className={style.categoryItem}>
              {cat}
            </li>
          ))
        ) : (
          <li className={style.empty}>No categories yet</li>
        )}
      </ul>
    </div>
  )
}

export default AllHabitsModal
