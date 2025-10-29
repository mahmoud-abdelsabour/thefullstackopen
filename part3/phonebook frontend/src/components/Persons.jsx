const Persons = ({personsToShow, deleteEvent}) => {
    return (
        <div>
            {personsToShow.map(person => <p key={person.id}> {person.name +' '+ person.number} <button onClick={()=> deleteEvent(person.id, person.name)}>Delete</button> </p>)}
        </div>
    )
}

export default Persons