import S7 from './S7 Logo.svg'
import './Ticket.scss'

const Ticket = () => {
  return (
    <div className="ticket">
      <div className="ticket__header">
        <p className="ticket__price">13 400 P</p>
        <div className="ticket__image">
          <img className="ticket__img" src={S7} alt='Логотип авиокомпании'/>
        </div>
      </div>
      <div className='ticket__table'>
        <div className="ticket__col">
          <div className='ticket__cell'>
            <p className='font-light'>MOW – HKT</p>
            <p className='font-dark'>10:45 - 08:00</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>В пути</p>
            <p className='font-dark'>21ч 15м</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>2 пересадки</p>
            <p className='font-dark'>HKG, JNB</p>
          </div>
        </div>
        <div className="ticket__col">
        <div className='ticket__cell'>
            <p className='font-light'>MOW – HKT</p>
            <p className='font-dark'>10:45 - 08:00</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>В пути</p>
            <p className='font-dark'>21ч 15м</p>
          </div>
          <div className='ticket__cell'>
            <p className='font-light'>2 пересадки</p>
            <p className='font-dark'>HKG, JNB</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket