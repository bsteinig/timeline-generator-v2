import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'
import { getUserData, removeUserData } from "../database/firebase";
import TitleCard from '../components/titlecard'
import '../App.css';

const EDIT_KEY = "react-editing-key"

function View({user}){

    const [timelines, setTimelines] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [pulled, setPulled] = useState(false);
    useEffect(() => {
        if (!pulled) {
            getUserData(user, (retrivedData) => {
              console.log(retrivedData);
              if (retrivedData) {
                setData(retrivedData);
                setPulled(true);
                setTimelines([Object.keys(retrivedData)]);
                setLoading(false);
              }else{
                setLoading(false)
              }
            });
          }
    }, []);

    function dateToString(date) {
        let hours = date.getHours()
        var time;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if(hours > 12){
            hours = hours - 12
            time = `${hours}:${minutes} PM`
        }else{
            time = hours === 12 ? `${hours}:${minutes} PM` : `${hours}:${minutes} AM`
        }
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${time}`;
    }

    const exportJSON = () => {
        var x = user.uid + "|" + timelines[0][selected]
        console.log(x);
        document.getElementById("export-box").innerHTML = x
    }

    const handleSelect = (index) => {
        if(selected !== -1){
            document.getElementById("export-box").innerHTML = ""
        }
        setSelected(index);
        var arr = [user.uid,timelines[0][index]]
        localStorage.setItem(EDIT_KEY, JSON.stringify(arr))
        window.timeline = new window.TL.Timeline('timeline-embed', data[timelines[0][index]].timeline);
    }

    const deleteHandler = () => {
        if(window.confirm("click OK to delete timeline")){
            removeUserData(user, timelines[0][selected])
            document.getElementById("timeline-embed").className = ""
            document.getElementById("timeline-embed").innerHTML = null
            setSelected(-1)
        }
    }

    //console.log(Object.keys(data))

    return(
        <div className="todo-container">
            { loading ? 
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
            <div>
            {data ? 
            <div className="list-container">
                <div className="spacer"></div>
                <ul className="card-list">
                {Object.keys(data).map((timeline,index) => {
                        return (
                        <TitleCard
                            fakeId={index}
                            handleSelect={handleSelect}
                            lastModified={dateToString(new Date(data[timeline].lastModified))}
                            title={data[timeline].timeline.title.text.headline}
                        />
                        );
                })}
                <li key='-1' className="add-timeline">
                    <a href="/create" className="big-plus"><i className="fas fa-plus"></i></a>
                </li>
                </ul>
                <div className="timeline-view">
                    <div className="selected">
                        {selected === -1 ?
                            <h3>Click to select a timeline, or create a new one</h3>
                        :
                            <div className="selection-row">
                                <h3>Selected:&nbsp;{data[timelines[0][selected]].timeline.title.text.headline}</h3>
                                <div className="btn-grp">
                                    <a href="/edit" className="trash view-edit">
                                        <i className="fas fa-edit"></i>
                                    </a>
                                    <button onClick={deleteHandler} className="trash view-trash">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                                
                            </div>
                        }   
                    </div>
                    <div id='timeline-embed'></div>
                    <p className="timeline-credit">Timeline Generation Created by: <a href="https://knightlab.northwestern.edu/" rel="noreferrer noopener" target="_blank">The Northwestern University Knight Lab</a>.</p>
                    {selected === -1 ?
                        <></>
                    :
                        <div className="export-section">
                            <h3 className="export-btn" onClick={exportJSON}>Export Timeline</h3>
                            <textarea id="export-box" className="export-text"></textarea>
                        </div>
                    }
                </div>
            </div>
            :
            <div>
            <div className="spacer"></div>
                <ul className="card-list">
                    <li key='-1' className="add-timeline">
                        <a href="/create" className="big-plus"><i className="fas fa-plus"></i></a>
                    </li>
                </ul>
                <h1 className="empty-view">You haven't created any timelines</h1>
            </div>
            }
            </div>
            }
        </div>
    )
}

export default View;
