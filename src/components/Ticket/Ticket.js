import { format, add } from 'date-fns'

import styles from './Ticket.module.scss'

const Ticket = ({
  price,
  carrier,
  firstDate,
  firstDest,
  firstDuration,
  firstOrigin,
  firstStops,
  secondDate,
  secondDest,
  secondDuration,
  secondOrigin,
  secondStops,
}) => {
  const stopsDescr = (stops) => {
    if (!stops.length) {
      return 'Без пересадок'
    } else if (stops.length === 1) {
      return '1 пересадка'
    } else if (stops.length === 2) {
      return '2 пересадки'
    } else {
      return '3 пересадки'
    }
  }

  const dates = (date, duration) => {
    const first = format(new Date(date), 'H:mm')
    const second = format(add(new Date(date), { minutes: duration }), 'H:mm')
    return `${first} - ${second}`
  }

  const timeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return `${hours}ч ${minutes}м`
  }

  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__header}>
        <p className={styles.ticket__price}>{`${price} P`}</p>
        <div className={styles.ticket__image}>
          <img
            className={styles.ticket__img}
            src={`https://pics.avs.io/99/36/${carrier}.png`}
            alt="Логотип авиокомпании"
          />
        </div>
      </div>
      <div className={styles.ticket__table}>
        <div className={styles.ticket__col}>
          <div className={styles.ticket__cell}>
            <p className={styles.fontLight}>{`${firstOrigin} - ${firstDest}`}</p>
            <p className={styles.fontDark}>{dates(firstDate, firstDuration)}</p>
          </div>
          <div className={styles.ticket__cell}>
            <p className={styles.fontLight}>В пути</p>
            <p className={styles.fontDark}>{timeFromMins(firstDuration)}</p>
          </div>
          <div className={styles.ticket__cell}>
            <p className={styles.fontLight}>{stopsDescr(firstStops)}</p>
            <p className={styles.fontDark}>{firstStops.join(', ')}</p>
          </div>
        </div>
        <div className={styles.ticket__col}>
          <div className={styles.ticket__cell}>
            <p className={styles.fontLight}>{`${secondOrigin} - ${secondDest}`}</p>
            <p className={styles.fontDark}>{dates(secondDate, secondDuration)}</p>
          </div>
          <div className={styles.ticket__cell}>
            <p className={styles.fontLight}>В пути</p>
            <p className={styles.fontDark}>{timeFromMins(secondDuration)}</p>
          </div>
          <div className={styles.ticket__cell}>
            <p className={styles.fontLight}>{stopsDescr(secondStops)}</p>
            <p className={styles.fontDark}>{secondStops.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
