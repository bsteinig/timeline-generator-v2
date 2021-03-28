import React, { useState, useEffect } from 'react';
import Form from '../components/form'
import Eventlist from '../components/eventlist'
import '../App.css';
import { writeUserData } from '../database/firebase';

const LOCAL_STORAGE_KEY = "react-event-list_events"
const VAR_KEY = "react-var-key"

function Create({user}){
    
    const [created, setCreated] = useState(false)
    const [title, setTitle] = useState({
        title: "",
        titleMedia: "",
        titleMediaCredit: ""
    })
    const [events, setEvents] = useState([])

    //Effects
    useEffect( (events) => {
        const storageEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storageEvents) {
            setEvents(storageEvents);
        }
        const storageVars = JSON.parse(localStorage.getItem(VAR_KEY));
        if(storageVars){
            setCreated(storageVars[0]);
        }
    }, [])

    useEffect( () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events))
        var arr = [created]
        localStorage.setItem(VAR_KEY, JSON.stringify(arr))
    }, [events, created])

    const formChangeHandler = (e) => {
        const value = e.target.value;
        setTitle({
            ...title,
            [e.target.name]: value
        });
    }

    const handleCreate = () => {
        setCreated(created => !created)
        alert("Timeline created. Use the form to create events for your timeline.")
        console.log(title)

    }

    const onSubmitForm = () => {
        if(events.length === 0){
            alert("Please create at least one event")
        }else if(window.confirm("click OK to submit timeline")){
            setCreated(created => !created)
            let tData;
            if(title.titleMedia === ""){
                tData = {
                    text: {
                        headline: title.title
                    }
                }
            }else{
                tData = {
                    media: {
                        url: title.titleMedia,
                        credit: title.titleMediaCredit
                    },
                    text: {
                        headline: title.title
                    }
                }
            }
            let data = {
                author: user.displayName,
                user: user.uid,
                lastModified: Date.now(),
                timeline: {
                    title: tData,
                    events: events
                }
            };
            writeUserData(data);
            setEvents([]);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }

    return(
        <div>
        {created ?
            <div className="timeline-tool">
                <Form onSubmitForm={onSubmitForm} events={events} setEvents={setEvents}/>
                <Eventlist events={events} setEvents={setEvents}/>
            </div>
        :
            <div className="create-page">
                <form className="create-form" onSubmit={handleCreate}>
                    <label htmlFor="title" className="form-label">Timeline Title:</label>
                    <input type='text' id='title' name='title' className="form-input create-input" onChange={formChangeHandler} required/>
                    <label htmlFor="title" className="form-label">Title Media:</label>
                    <input type='text' id='title' name='titleMedia' className="form-input create-input" onChange={formChangeHandler}/>
                    <label htmlFor="title" className="form-label">Media Credit</label>
                    <input type='text' id='title' name='titleMediaCredit' className="form-input create-input" onChange={formChangeHandler}/>
                    <div className="create-btn">
                        <input className="btn-create" type="submit" value="Create"></input>
                    </div>
                </form>
            </div>
        }
        </div>
    )
}

export default Create;