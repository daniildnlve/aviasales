import { useSelector } from "react-redux"
import { useState } from "react"

import Ticket from "../Ticket/Ticket"
import './TicketList.scss'

const TicketList = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  const tickets = useSelector(state => state.tickets.tickets)
  
  const elements = tickets.slice(0, visibleCount).map((ticket) => {
    const first = ticket.segments[0];
    const second = ticket.segments[1];

    return (
      <li>
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
    <div className="list">
      <ul className="list__tickets">
        {elements}
      </ul>
      <button className="list__button">Показать ещё 5 билетов!</button>
    </div>
  )
}

export default TicketList