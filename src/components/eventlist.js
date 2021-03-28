import React from 'react'
import Event from "./event"

const Eventlist = ({events, setEvents}) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {events.map((event,index) => (
                    <Event
                        fakeId={index}
                        key={event.id}
                        event={event}
                        events={events}
                        setEvents={setEvents}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Eventlist