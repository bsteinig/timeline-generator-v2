import React, { useState, useEffect } from 'react'
import { getImportData } from "../database/firebase";

function Import({user}) {

    const [data, setData] = useState(null);
    const [pulled, setPulled] = useState(false);
    var userID, timelineID;

    const onChangeHandler = (e) => {
        console.log(e.target.value)
        var res = (e.target.value).split("|")
        // 0 is userID , 1 is timelineID
        setPulled(false)
        userID = res[0]
        timelineID = res[1]
    }

    const renderImport = () => {
        if (!pulled) {
            getImportData(userID, timelineID, (retrivedData) => {
              if (retrivedData) {
                setData(retrivedData);
                setPulled(true);
                console.log("retrieved",retrivedData)
                window.timeline = new window.TL.Timeline('timeline-embed', retrivedData.timeline);
              }
            });
        }
    }

    return (
        <div className="import-page">
            <h3 className="import-txt">Paste Export Text here:</h3>
            <textarea className="export-text" onChange={onChangeHandler}></textarea>
            <button className="import-btn" onClick={renderImport}>Import Timeline</button>
            <div id='timeline-embed' className="import-timeline"></div>        
        </div>
    )
}

export default Import
