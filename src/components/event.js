import React from "react"

const Event = ({ fakeId, event, events, setEvents}) => {

    const deleteHandler = () => {
        setEvents(events.filter(el => el.id !== event.id));
    }
    // <h1>{(fakeId+1) < 10 ? "0"+(fakeId+1) : (fakeId+1)}</h1>
    console.log(event)

    function DMYtoDate(dObj){
        return dObj.year + "/" + dObj.month + "/" + dObj.day;
    }


    return (
            <li id={event.id}>
                <div className="card" title={fakeId+1}>
                    <div className="todo-item" >
                        <h4 className="tag">Event:</h4>
                        <h5 className="entry entry-title">{event.text.headline}</h5>
                        <h4 className="tag">Description:</h4>
                        <h5 className="entry desc">{event.text.text}</h5>
                        <h4 className="tag">Image:</h4>
                        <h5 className="entry img-link">{event.media.url}</h5>
                        <h4 className="tag">Image Credit:</h4>
                        <h5 className="entry">{event.media.credit}</h5>
                        <h4 className="tag">Image Caption:</h4>
                        <h5 className="entry">{event.media.caption}</h5>
                        {event.end_date.year === "" ? 
                        <div>
                            <h4 className="tag">Event Date</h4>
                            <h5 className="entry">{DMYtoDate(event.start_date)}</h5>
                        </div> :
                        <div> 
                            <h4 className="tag">Start Date</h4>
                            <h5 className="entry">{DMYtoDate(event.start_date)}</h5> 
                            <h4 className="tag">End Date</h4>
                            <h5 className="entry">{DMYtoDate(event.end_date)}</h5> 
                        </div>
                        }
                    
                    </div>
                    <div className="trash-btn">
                        <button onClick={deleteHandler} className="trash">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                    <h1 className="bg-num">{fakeId+1}</h1>
                </div>
                
                
            </li>
    )
}

export default Event