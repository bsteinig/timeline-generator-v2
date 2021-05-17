import React, { useState, useEffect } from 'react';
import Form from '../components/form'
import Eventlist from '../components/eventlist'
import '../App.css';
import { writeUserData, logUserActivity} from '../database/firebase';

const LOCAL_STORAGE_KEY = "react-event-list_events"
const VAR_KEY = "react-var-key"
const LOCAL_TITLE_KEY = "react-title-key"

function Create({user}){
    
    const [created, setCreated] = useState(false)
    const [title, setTitle] = useState({
        title: "",
        text: "",
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
        const storageTitle = localStorage.getItem(LOCAL_TITLE_KEY);
        if(storageTitle){
            setTitle(JSON.parse(storageTitle));
        }
    }, [])

    useEffect( () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events))
        var arr = [created]
        localStorage.setItem(VAR_KEY, JSON.stringify(arr))
        localStorage.setItem(LOCAL_TITLE_KEY,JSON.stringify(title))
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
        // Create, Add Event, Submit
        let data = {time: new Date(), action: 'Create'}
        logUserActivity(user,data)
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
                        headline: title.title,
                        text: title.text
                    }
                }
            }else{
                tData = {
                    media: {
                        url: title.titleMedia,
                        credit: title.titleMediaCredit
                    },
                    text: {
                        headline: title.title,
                        text: title.text
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
            setTitle({
                title: "",
                text: "",
                titleMedia: "",
                titleMediaCredit: ""
            })
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            localStorage.removeItem(LOCAL_TITLE_KEY);
            let log = {time: new Date(), action: 'Submit'}
            logUserActivity(user,log)
            alert("Timeline Created! Find it on the View Page.")
        }
    }

    return(
        <div>
        {created ?
            <div className="timeline-tool">
                <Form user={user} onSubmitForm={onSubmitForm} events={events} setEvents={setEvents} title={title.title}/>
                <Eventlist events={events} setEvents={setEvents}/>
            </div>
        :
            <div className="create-page">
                <form className="create-form" onSubmit={handleCreate}>
                    <label htmlFor="title" className="form-label">Timeline Title:</label>
                    <input type='text' id='title' name='title' className="form-input create-input" onChange={formChangeHandler} required/>
                    <label htmlFor="text" className="form-label">Title Text:</label>
                    <input type='text' id='text' name='text' className="form-input create-input" onChange={formChangeHandler}/>
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