import React from 'react'
import Navbar from '../ui/Navbar'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {messages} from '../../helpers/calendar-messages'

moment.locale('es')

const localizer = momentLocalizer(moment) 

const CalendarScreen = () => {

    const events=[{
        title:'Cumpleanos del jefe',
        start:moment().add(-10,'hours').toDate(),
        end:moment().add(-7,'hours').toDate(),
        bgcolor:"#7e3434"
    }]

    const eventStyleGetter=(event,  start, end, isSelected)=>{
        const style={
            backgroundColor:'#367cf7',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        return{
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar/>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            />
        </div>
    )
}

export default CalendarScreen
