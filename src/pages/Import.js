import React, {useState} from 'react'

function Import() {

    const [importData, setImportData] = useState();

    const onChangeHandler = (e) => {
        console.log(e.target.value)
        var d = JSON.parse(e.target.value)
        setImportData(d)
    }

    const renderImport = () => {
        window.timeline = new window.TL.Timeline('timeline-embed', importData);
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
