import React from 'react'
import EditEvent from "./editevent"

const Editlist = ({events, setEvents}) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {events.map((event,index) => (
                    <EditEvent
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

export default Editlist