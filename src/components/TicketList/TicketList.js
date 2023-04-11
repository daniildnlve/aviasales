import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Alert, Skeleton } from 'antd'

import Ticket from '../Ticket/Ticket'
import { setNotFind } from '../../store/ticketSlice'

import styles from './TicketList.module.scss'

const TicketList = () => {
  const [visibleCount, setVisibleCount] = useState(5)

  const dispatch = useDispatch()

  const tickets = useSelector((state) => state.tickets.tickets)
  const sortValue = useSelector((state) => state.sort.sort)
  const filter = useSelector((state) => state.filter)
  const notFind = useSelector((state) => state.tickets.notFind)
  const firstLoading = useSelector((state) => state.tickets.firstLoading)
  const firstLoadingEnd = useSelector((state) => state.tickets.firstLoadingEnd)

  useEffect(() => {
    setVisibleCount(5)
  }, [filter, sortValue])

  const sortingTickets = (tickets, sort) => {
    const clonedTickets = [...tickets]
    if (sort === 'cheap') {
      return clonedTickets.sort((a, b) => a.price - b.price)
    } else if (sort === 'fast') {
      return clonedTickets.sort((a, b) => {
        const first = a.segments[0].duration + a.segments[1].duration
        const second = b.segments[0].duration + b.segments[1].duration
        return first - second
      })
    }
  }

  const filteringTickets = (tickets, filter) => {
    let filteredArray = [...tickets]
    if (!filter.noTrns) {
      filteredArray = filteredArray.filter((ticket) => ticket.segments[0].stops.length !== 0)
    }
    if (!filter.trns1) {
      filteredArray = filteredArray.filter((ticket) => ticket.segments[0].stops.length !== 1)
    }
    if (!filter.trns2) {
      filteredArray = filteredArray.filter((ticket) => ticket.segments[0].stops.length !== 2)
    }
    if (!filter.trns3) {
      filteredArray = filteredArray.filter((ticket) => ticket.segments[0].stops.length !== 3)
    }
    return filteredArray
  }

  const visibleItems = filteringTickets(sortingTickets(tickets, sortValue), filter)

  useEffect(() => {
    dispatch(setNotFind(false))
    if (!visibleItems.length) {
      dispatch(setNotFind(true))
    }
  }, [dispatch, filter, visibleItems])

  const skeletonArray = [1, 2, 3, 4, 5]
  const skeletonElements = skeletonArray.map((item) => {
    return (
      <li key={item} className={styles.skeletonTicket}>
        <Skeleton title={{ width: '100%' }} paragraph={{ rows: 3, width: '100%' }} active />
      </li>
    )
  })

  const elements = visibleItems.slice(0, visibleCount).map((ticket) => {
    const first = ticket.segments[0]
    const second = ticket.segments[1]

    return (
      <li key={ticket.price + ticket.carrier + first.date}>
        <Ticket
          price={ticket.price}
          carrier={ticket.carrier}
          firstDate={first.date}
          firstDest={first.destination}
          firstDuration={first.duration}
          firstOrigin={first.origin}
          firstStops={first.stops}
          secondDate={second.date}
          secondDest={second.destination}
          secondDuration={second.duration}
          secondOrigin={second.origin}
          secondStops={second.stops}
        />
      </li>
    )
  })

  return (
    <div className={styles.list}>
      <ul className={styles.list__tickets}>
        {firstLoading && skeletonElements}
        {!firstLoading && elements}
        {firstLoadingEnd && notFind && (
          <Alert
            type="info"
            showIcon
            description="Рейсов, подходящих под заданные фильтры, не найдено"
            style={{ margin: '0 20px' }}
          />
        )}
      </ul>
      {!notFind && firstLoadingEnd && (
        <button className={styles.list__button} onClick={() => setVisibleCount(visibleCount + 5)}>
          Показать ещё 5 билетов!
        </button>
      )}
    </div>
  )
}

export default TicketList
