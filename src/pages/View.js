import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'
import { getUserData } from "../database/firebase";
import TitleCard from '../components/titlecard'
import '../App.css';


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
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    const handleSelect = (index) => {
        setSelected(index);
        console.log(index)
        window.timeline = new window.TL.Timeline('timeline-embed', data[timelines[0][index]].timeline);
    }

    //console.log(Object.keys(data))

    return(
        <div className="todo-container">
            { loading ? 
            <div class="spinner">
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
                        <h3>Selected:&nbsp;</h3>
                        {selected === -1 ?
                            <h3>Click to select a timeline, or create a new one</h3>
                        :
                            <h3>{data[timelines[0][selected]].timeline.title.text.headline}</h3>
                        }   
                    </div>
                    <div id='timeline-embed'></div>
                    <p className="timeline-credit">Timeline Generation Created by: <a href="https://knightlab.northwestern.edu/" rel="noreferrer noopener" target="_blank">The Northwestern University Knight Lab</a>.</p>
                    {selected === -1 ?
                        <></>
                    :
                        <div className="export-section">
                            <h3 className="export-btn">Export Timeline</h3>
                            <textarea className="export-text">{JSON.stringify(data[timelines[0][selected]].timeline)}</textarea>
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


/*
<tr key={workout}>
                  <td>{data[workout].name}</td>
                  <td>{data[workout].total}</td>
                  <td>{dateToString(new Date(data[workout].updatedAt))}</td>
                </tr>
*/