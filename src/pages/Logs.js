import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import CsvDownload from 'react-json-to-csv'
import ReactJson from 'react-json-view'
import { fetchUserLogs } from '../database/firebase';

function Logs() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pulled, setPulled] = useState(false);
    useEffect(() => {
        if (!pulled) {
            fetchUserLogs((retrivedData) => {
              console.log(retrivedData);
              if (retrivedData) {
                setData(retrivedData);
                setPulled(true);
                setLoading(false);
              }else{
                setLoading(false)
              }
            });
          }
    }, []);

    return (
        <div className="logs-container">
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
                <div className="log-row">
                    <h1>Log Content </h1>
                    <CsvDownload 
                        data={data}
                        filename="timeline_logs.csv"
                        style={{ //pass other props, like styles
                        backgroundColor:"#0f9bd1",
                        cursor:"pointer","color":"#ffffff",
                        fontSize:"1.5rem",
                        padding:".5rem 1rem",
                        textDecoration:"none",
                        border: "none",
                        borderRadius: ".75rem"
                        }}
                    >
                        Download CSV logs
                    </CsvDownload>
                </div>
                    <div className="json-box">
                        <ReactJson src={data}  
                            iconStyle='triangle' 
                            enableClipboard={false} 
                            displayDataTypes={false}
                            />
                    </div>
                    <div className="spacer"></div>
                </div>
                
            }
            
        </div>
    )
}

export default Logs
