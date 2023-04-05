import Ticket from "../Ticket/Ticket"
import './TicketList.scss'

const TicketList = () => {
  return (
    <div className="list">
      <ul className="list__tickets">
        <Ticket />
        <Ticket />
        <Ticket />
      </ul>
      <button className="list__button">Показать ещё 5 билетов!</button>
    </div>
  )
}

export default TicketList