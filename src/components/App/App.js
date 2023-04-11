import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Progress, notification, Button } from 'antd'

import { getSearchId, getTickets } from '../../store/ticketSlice'
import TicketFilter from '../TicketFilters/TicketFIlters'
import TicketList from '../TicketList/TicketList'
import TicketSorting from '../TicketSorting/TicketSorting'
import logo from '../../images/Logo.svg'

import styles from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const searchId = useSelector((state) => state.tickets.searchId)
  const loading = useSelector((state) => state.tickets.loading)
  const progress = useSelector((state) => state.tickets.progress)
  const status = useSelector((state) => state.tickets.status)
  const error = useSelector((state) => state.tickets.error)

  useEffect(() => {
    dispatch(getSearchId())
  }, [dispatch])

  useEffect(() => {
    if (!searchId) {
      return
    }
    dispatch(getTickets(searchId))
  }, [dispatch, searchId])

  const [api, contextHolder] = notification.useNotification()
  const openNotification = useCallback(() => {
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          api.destroy()
          dispatch(getSearchId())
        }}
      >
        Найти билеты
      </Button>
    )
    api.error({
      message: 'Ошибка',
      description: 'Произошла ошибка во время поиска билетов. Вы можете попробовать ещё раз или обновить страницу',
      btn,
      placement: 'top',
      duration: 0,
    })
  }, [api, dispatch])

  useEffect(() => {
    if (error) {
      setTimeout(() => openNotification(), 1000)
    }
  }, [error, openNotification])

  return (
    <div className={styles.page}>
      {contextHolder}
      {loading && (
        <div className={styles.loading}>
          <Progress
            showInfo={false}
            percent={progress}
            className={styles.loading__bar}
            strokeLinecap="butt"
            status={status}
          />
        </div>
      )}
      <div className={styles.page__logo}>
        <img className={styles.page__image} src={logo} alt="Логотип" />
      </div>
      <div className={styles.elements}>
        <div className={styles.elements__left}>
          <TicketFilter />
        </div>
        <div className={styles.elements__right}>
          <TicketSorting />
          <TicketList />
        </div>
      </div>
    </div>
  )
}

export default App
