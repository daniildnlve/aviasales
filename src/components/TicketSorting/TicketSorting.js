import { useDispatch, useSelector } from 'react-redux'

import { setSort } from '../../store/sortSlice'

import styles from './TicketSorting.module.scss'

const TicketSorting = () => {
  const dispatch = useDispatch()
  const changeSort = (event) => dispatch(setSort(event.target.value))
  const sortValue = useSelector((state) => state.sort.sort)

  return (
    <div className={styles.sort}>
      <ul className={styles.sort__list}>
        <li className={styles.sort__el}>
          <input
            className={styles.sort__radio}
            id="cheap"
            value={'cheap'}
            onChange={changeSort}
            checked={sortValue === 'cheap'}
            name="sort"
            type="radio"
          />
          <label className={styles.sort__label} htmlFor="cheap">
            Самый дешевый
          </label>
        </li>
        <li className={styles.sort__el}>
          <input
            className={styles.sort__radio}
            id="fast"
            value={'fast'}
            onChange={changeSort}
            checked={sortValue === 'fast'}
            name="sort"
            type="radio"
          />
          <label className={styles.sort__label} htmlFor="fast">
            Самый быстрый
          </label>
        </li>
      </ul>
    </div>
  )
}

export default TicketSorting
