import React, {useState } from 'react'
import {v4 as uuid} from 'uuid'
import { Formik, Form as Formk ,Field, ErrorMessage } from 'formik'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as yup from 'yup'

// Formik  Props
const initialValues = {
    headline: '',
    text: '',
    media: '',
    mediaCredit: '',
    mediaCaption: '',
    dateStart: '',
    dateEnd: '',
}

const validationSchema = yup.object({
    headline: yup.string().required('Required'),
    text: yup.string(),
    media: yup.string().url("Must be a link to youtube, vimeo, instagram, twitter status, wikipedia, or an image"),
    mediaCaption: yup.string(),
    mediaCredit: yup.string(),
    dateStart: yup.string().required('Start Date/Event Date Required'),
    dateEnd: yup.string(),
})


const Form = ({onSubmitForm, events, setEvents, title}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calToggle, setCalToggle] = useState(false);
    const today = new Date();

    function easyDate(date) {
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }

    function yearMonthDay(date) {
        return [date.getFullYear(), (date.getMonth()+1), date.getDate()];
    }

    const onSubmit = (values, submitProps) => {
        console.log('Form data', values)
        console.log(easyDate(today));
        var sDate = yearMonthDay(startDate);
        var eDate;
        if(easyDate(today) === easyDate(endDate)){
            eDate = ["","",""];
            setEvents([...events,{
                media: {
                    url: values.media,
                    caption: values.mediaCaption,
                    credit: values.mediaCredit
                }, 
                start_date: {
                    year: sDate[0],
                    month: sDate[1],
                    day: sDate[2],
                },
                text: {
                    headline: values.headline,
                    text: values.text
                },
                id: uuid(),
                end: 'n'
            }]);
        }else{
            eDate = yearMonthDay(endDate);
            setEvents([...events,{
                media: {
                    url: values.media,
                    caption: values.mediaCaption,
                    credit: values.mediaCredit
                }, 
                start_date: {
                    year: sDate[0],
                    month: sDate[1],
                    day: sDate[2],
                },
                end_date: {
                    year: eDate[0],
                    month: eDate[1],
                    day: eDate[2],
                },
                text: {
                    headline: values.headline,
                    text: values.text
                },
                id: uuid()
            }]);
        }
        console.log(submitProps)
        submitProps.resetForm()
        setStartDate(new Date());
        setEndDate(new Date());
    } 


    const startDateChange = (values) => {
        values.dateStart = (easyDate(today) === easyDate(startDate) ? "" : easyDate(startDate));
    }

    const endDateChange = (values) => {
        values.dateEnd = (easyDate(today) === easyDate(endDate) ? "" : easyDate(endDate));;
    }

    const toggleCal = (e) => {
        console.log(e)
        if(e === true){ //single click
            setCalToggle(true);
            document.getElementById("left").style.backgroundColor = "#0f9bd1"
            document.getElementById("left").style.color = "#F2F2F2"
            document.getElementById("right").style.backgroundColor = "#E0E0E0"
            document.getElementById("right").style.color = "#4F4F4F"
        }else{
            setCalToggle(false);
            document.getElementById("right").style.backgroundColor = "#0f9bd1"
            document.getElementById("right").style.color = "#F2F2F2"
            document.getElementById("left").style.backgroundColor = "#E0E0E0"
            document.getElementById("left").style.color = "#4F4F4F"
        }
        console.log(calToggle)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        {({
            values
        }) => (
            <Formk className="formk">
                <div class="header-row">
                    <h1 className="time-title">&#9;{title}</h1>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="headline" className="form-label">Headline:</label>
                        <Field type='text' id='headline' name='headline' className="form-input"/>
                        <ErrorMessage name='headline'>{msg => <div className="error-msg">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-field">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <Field as='textarea' type='text' id='text' name='text' className="form-input txt-area"/>
                        <ErrorMessage name='text'>{msg => <div className="error-msg">{msg}</div>}</ErrorMessage>
                    </div>  
                </div>
                <div className="form-row">  
                    <div className="form-field">
                        <label htmlFor="media link" className="form-label">Media Link:</label>
                        <Field type='text' id='media' name='media' className="form-input media-link"/>
                        <ErrorMessage name='media'>{msg => <div className="error-msg">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-field">
                        <label htmlFor="media credit" className="form-label">Media Credit:</label>
                        <Field type='text' id='mediaCredit' name='mediaCredit' className="form-input"/>
                        <ErrorMessage name='mediaCredit'>{msg => <div className="error-msg">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-field">
                        <label htmlFor="media caption" className="form-label">Media Caption:</label>
                        <Field type='text' id='mediaCaption' name='mediaCaption' className="form-input"/>
                        <ErrorMessage name='mediaCaption'>{msg => <div className="error-msg">{msg}</div>}</ErrorMessage>
                    </div> 
                </div>
                    <div className="toggle-master">
                        <label htmlFor="date type" className="form-label">Date Type:</label>
                        <div className="toggle-group">
                            <button id="left" className="toggle toggle-left" type="button" onClick={() => toggleCal(true)}>Single</button>
                            <button id="right" className="toggle toggle-right" type="button" onClick={() => toggleCal(false)}>Range</button>
                        </div>
                    </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="start date" className="form-label">{calToggle ? `Event Date:` : `Start Date:`}</label>
                        <Field className="cal-input form-input" type="text" id="dateStart" name="dateStart" disabled={true} value={easyDate(startDate)} onChange={startDateChange(values)}></Field>
                        <Calendar onChange={setStartDate} value={startDate} defaultView="decade"  defaultValue={startDate} className="cal"/>
                        <ErrorMessage name="dateStart">{msg => <div className="error-msg">{msg}</div>}</ErrorMessage>
                    </div>
                    {calToggle ?
                    <></>
                    :
                    <div className="form-field">
                        <label htmlFor="end date" className="form-label">End Date:</label>
                        <Field className="cal-input form-input" type="text" id="dateEnd" name="dateEnd" disabled={true} value={easyDate(endDate)} onChange={endDateChange(values)}></Field>
                        <Calendar onChange={setEndDate} value={endDate} defaultView="decade"  defaultValue={(endDate)} className="cal"/>
                        <ErrorMessage name="dateEnd">{msg => <div className="error-msg">{msg}</div>}</ErrorMessage>
                    </div>
                    }
                </div>
                
                <div className="submit-btn">
                    <button className="todo-button" type="submit">
                        <h1 className="add-event">Add Event </h1>
                        <i className="fas fa-plus"></i>
                    </button>
                    <button className="todo-button" onClick={onSubmitForm}>
                        <h1 className="add-event">Submit</h1>
                        <i className="fas fa-check"></i>
                    </button>
                </div>
            </Formk>
        )}
        </Formik>
        
    );   
}


export default Form

/*
if(values.media === ""){
            if(values.dateEnd === ""){
                setEvents([...events,{ 
                    start_date: {
                        year: startDate.getFullYear(),
                        month: (startDate.getMonth() + 1),
                        day: startDate.getDate(),
                    },
                    text: {
                        headline: values.headline,
                        text: values.text
                    }
                }]);
            }else{
                setEvents([...events,{ 
                    start_date: {
                        year: startDate.getFullYear(),
                        month: (startDate.getMonth() + 1),
                        day: startDate.getDate()
                    },
                    end_date: {
                        year: endDate.getFullYear(),
                        month: (endDate.getMonth() + 1),
                        day: endDate.getDate()
                    },
                    text: {
                        headline: values.headline,
                        text: values.text
                    }
                }]);
            }
        }else{
            if(values.dateEnd === ""){
                console.log("start Date", startDate)
                setEvents([...events,{
                    media: {
                        url: values.media,
                        caption: values.mediaCaption,
                        credit: values.mediaCredit
                    }, 
                    start_date: {
                        year: startDate.getFullYear(),
                        month: (startDate.getMonth() + 1),
                        day: startDate.getDate()
                    },
                    text: {
                        headline: values.headline,
                        text: values.text
                    }
                }]);
            }else{
                setEvents([...events,{
                    media: {
                        url: values.media,
                        caption: values.mediaCaption,
                        credit: values.mediaCredit
                    }, 
                    start_date: {
                        year: startDate.getFullYear(),
                        month: (startDate.getMonth() + 1),
                        day: startDate.getDate()
                    },
                    end_date: {
                        year: endDate.getFullYear(),
                        month: (endDate.getMonth() + 1),
                        day: endDate.getDate()
                    },
                    text: {
                        headline: values.headline,
                        text: values.text
                    }
                }]);
            }
        }
    */