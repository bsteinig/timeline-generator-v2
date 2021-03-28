import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'
import { getUserData } from "../database/firebase";
import TitleCard from '../components/titlecard'
import '../App.css';

function View({user}){

    const [timelines, setTimelines] = useState([]);
    const [selected, setSelected] = useState(1);
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
                setLoading(false)
                var d = (Object.keys(retrivedData));
                setTimelines(d);
              }
            });
          }
    }, []);

    function dateToString(date) {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    const handleSelect = (index) => {
        setSelected(index);
        console.log(data[timelines[index]])
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
                <div class="spacer"></div>
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
                </ul>
                <div className="timeline-view">
                    <div id='timeline-embed'></div>
                </div>
            </div>
            :
            <h1 className="empty-view">You haven't created any timelines</h1>
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