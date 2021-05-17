import React, { useEffect, useState } from 'react'
import Editlist from '../components/editlist';
import Loader from 'react-loader-spinner'
import { getImportData } from "../database/firebase";

const EDIT_KEY = 'react-editing-key'

function Edit() {

    const [pulled, setPulled] = useState(false);
    const [title, setTitle] = useState(null)
    const [events, setEvents] = useState([])

    useEffect(() => {
        setPulled(false)
        if(!pulled){
            const storageVars = JSON.parse(localStorage.getItem(EDIT_KEY));
            if(storageVars){
                getImportData(storageVars[0],storageVars[1], (retrivedData) => {
                    if (retrivedData) {
                        console.log("retrieved",retrivedData)
                        console.log("timeline",retrivedData.timeline)
                        var e = retrivedData.timeline.events
                        console.log(e)
                        setEvents(e)
                        var t = retrivedData.timeline.title
                        console.log(t)
                        setTitle(t)
                        //setEvents(JSON.parse(retrivedData.timeline.events))
                        //setTitle(JSON.parse(retrivedData.timeline.title))
                        setPulled(true)
                    }
                });
            }
        }
    }, [])

    return(
        <div className="edit-page">
            { !pulled ? 
                <div className="spinner">
                    <Loader
                        type="Rings"
                        color="#0f9bd1"
                        height={350}
                        width={350}
                        visible={true}
                        style={{display:'flex', justifyContent:'center', marginTop:'3rem' }}
                    />  
                </div>  
            :
            <div className="timeline-tool">
                <h1>Hello World</h1>
                <Editlist events={events} setEvents={setEvents}/>
                <a href="/view">Open</a>
            </div>
            }
        </div>
        
    )
}

export default Edit;

