import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSearchId, getTickets } from '../../store/ticketSlice'
import TicketFilter from '../TicketFilters/TicketFIlters'
import TicketList from '../TicketList/TicketList'
import TicketSorting from '../TicketSorting/TicketSorting'

import './App.scss'
import logo from './Logo.svg'

const App = () => {
  const dispatch = useDispatch();
  const searchId = useSelector(state => state.tickets.searchId)  

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (!searchId) {
      return
    }
    dispatch(getTickets(searchId))
  }, [dispatch, searchId])

  return (
    <div className='page'>
      <div className='page__logo'>
        <img className='page__image' src={logo} alt='Логотип' />
      </div>
      <div className='elements'>
        <div className='elements__left'>
          <TicketFilter />
        </div>
        <div className='elements__right'>
          <TicketSorting />
          <TicketList />
        </div>
      </div>
    </div>
  )
}

export default App