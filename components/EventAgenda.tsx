
const EventAgenda = ({ agendaItems }: { agendaItems: string[]}) => {
  return (
    <div className="agende">
        <h2>Agenda</h2>
        <ul>

        {agendaItems.map((item) => (
            <li key={item}>
               {item}
            </li>
        ))}
        </ul>
    </div>
  )
}

export default EventAgenda