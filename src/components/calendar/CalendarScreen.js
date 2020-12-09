import React, { useState } from 'react'
import Navbar from '../ui/Navbar'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {messages} from '../../helpers/calendar-messages'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import {openModalAction } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'

moment.locale('es')

const localizer = momentLocalizer(moment) 

const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')

    const {events} = useSelector(state => state.calendar)

    const eventStyleGetter=(event,  start, end, isSelected)=>{
        const style={
            backgroundColor:'#367cf7',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        return style
        
    }

    const onDoubleClick=(e)=>{
        dispatch(openModalAction())
    }

    const onSelectEvent=(e)=>{
        dispatch(eventSetActive(e))
    }

    const onViewChange=(e)=>{
        setLastView(e)
        localStorage.setItem('lastView',e)
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
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            view={lastView}
            components={{
                event:CalendarEvent
            }}
            />
            <AddNewFab/>
            <CalendarModal/>
        </div>
    )
}

export default CalendarScreen
