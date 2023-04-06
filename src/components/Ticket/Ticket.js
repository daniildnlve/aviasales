import { format, add } from 'date-fns'

import './Ticket.scss'

const Ticket = (
    {
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
      secondStops
    }
  ) => {
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
    const first = format(new Date(date), 'H:mm');
    const second = format(add(new Date(date), {minutes: duration}), 'H:mm');
    return `${first} - ${second}`
  } 

  const timeFromMins = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className="ticket">
      <div className="ticket__header">
        <p className="ticket__price">{`${price} P`}</p>
        <div className="ticket__image">
          <img className="ticket__img" src={`https://pics.avs.io/99/36/${carrier}.png`} alt='Логотип авиокомпании'/>
        </div>
      </div>
      <div className='ticket__table'>
        <div className="ticket__col">
          <div className='ticket__cell'>
            <p className='font-light'>{`${firstOrigin} - ${firstDest}`}</p>
            <p className='font-dark'>{dates(firstDate, firstDuration)}</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>В пути</p>
            <p className='font-dark'>{timeFromMins(firstDuration)}</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>{stopsDescr(firstStops)}</p>
            <p className='font-dark'>{firstStops.join(', ')}</p>
          </div>
        </div>
        <div className="ticket__col">
        <div className='ticket__cell'>
            <p className='font-light'>{`${secondOrigin} - ${secondDest}`}</p>
            <p className='font-dark'>{dates(secondDate, secondDuration)}</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>В пути</p>
            <p className='font-dark'>{timeFromMins(secondDuration)}</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>{stopsDescr(secondStops)}</p>
            <p className='font-dark'>{secondStops.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket