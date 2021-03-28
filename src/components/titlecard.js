import React from "react"

const TitleCard = ({ fakeId, handleSelect, lastModified, title}) => {

    // <h1>{(fakeId+1) < 10 ? "0"+(fakeId+1) : (fakeId+1)}</h1>

    return (
            <li key={fakeId}>
                <button onClick={() => handleSelect(fakeId)} className="card" title={fakeId+1}>
                    <div className="todo-item" >
                        <h4 className="tag">Title:</h4>
                        <h5 className="entry">{title}</h5>
                        <h4 className="tag">Last Modified:</h4>
                        <h5 className="entry">{lastModified}</h5>
                    </div>
                    <h1 className="bg-num-title">{fakeId+1}</h1>
                </button>
                
                
            </li>
    )
}

export default TitleCard