import { useDispatch, useSelector } from 'react-redux'

import { allCheckedChange, checkedChange } from '../../store/filterSlice'

import styles from './TicketFilters.module.scss'

const TicketFilter = () => {
  const dispatch = useDispatch()
  const changeAllChecked = () => dispatch(allCheckedChange())
  const changeChecked = (name) => dispatch(checkedChange(name))
  const filter = useSelector((state) => state.filter)

  return (
    <div className={styles.filters}>
      <p className={styles.filters__label}>Количество пересадок</p>
      <ul className={styles.filters__list}>
        <li className={styles.filters__el}>
          <input
            className={styles.customCheckbox}
            onChange={changeAllChecked}
            checked={filter.allChecked}
            id="filter-1"
            type="checkbox"
          />
          <label className={styles.checkboxLabel} htmlFor="filter-1">
            Все
          </label>
        </li>
        <li className={styles.filters__el}>
          <input
            className={styles.customCheckbox}
            onChange={() => changeChecked('noTrns')}
            checked={filter.noTrns}
            id="filter-2"
            type="checkbox"
          />
          <label className={styles.checkboxLabel} htmlFor="filter-2">
            Без пересадок
          </label>
        </li>
        <li className={styles.filters__el}>
          <input
            className={styles.customCheckbox}
            onChange={() => changeChecked('trns1')}
            checked={filter.trns1}
            id="filter-3"
            type="checkbox"
          />
          <label className={styles.checkboxLabel} htmlFor="filter-3">
            1 пересадка
          </label>
        </li>
        <li className={styles.filters__el}>
          <input
            className={styles.customCheckbox}
            onChange={() => changeChecked('trns2')}
            checked={filter.trns2}
            id="filter-4"
            type="checkbox"
          />
          <label className={styles.checkboxLabel} htmlFor="filter-4">
            2 пересадки
          </label>
        </li>
        <li className={styles.filters__el}>
          <input
            className={styles.customCheckbox}
            onChange={() => changeChecked('trns3')}
            checked={filter.trns3}
            id="filter-5"
            type="checkbox"
          />
          <label className={styles.checkboxLabel} htmlFor="filter-5">
            3 пересадки
          </label>
        </li>
      </ul>
    </div>
  )
}

export default TicketFilter
