import './TicketSorting.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setSort } from '../../store/sortSlice'

const TicketSorting = () => {
  const dispatch = useDispatch();
  const changeSort = (event) => dispatch(setSort(event.target.value));
  const sortValue = useSelector(state => state.sort.sort)

  return (
    <div className='sort'>
      <ul className='sort__list'>
        <li className='sort__el'>
          <input 
            className='sort__radio' 
            id='cheap' 
            value={'cheap'} 
            onChange={changeSort} 
            checked={sortValue === 'cheap'} 
            name='sort' 
            type='radio' 
          />
          <label className='sort__label' htmlFor='cheap'>Самый дешевый</label>
        </li>
        <li className='sort__el'>
          <input 
            className='sort__radio' 
            id='fast' 
            value={'fast'} 
            onChange={changeSort} 
            checked={sortValue === 'fast'} 
            name='sort' 
            type='radio' 
          />
          <label className='sort__label' htmlFor='fast'>Самый быстрый</label>
        </li>
        <li className='sort__el'>
          <input 
            className='sort__radio' 
            id='optimal' 
            value={'optimal'} 
            onChange={changeSort} 
            checked={sortValue === 'optimal'} 
            name='sort' 
            type='radio' 
          />
          <label className='sort__label' htmlFor='optimal'>Оптимальный</label>
        </li>
      </ul>
    </div>
  )
}

export default TicketSorting