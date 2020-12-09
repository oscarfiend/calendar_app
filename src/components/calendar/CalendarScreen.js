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
import { eventClearActive, eventSetActive } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

moment.locale('es')

const localizer = momentLocalizer(moment) 

const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')

    const {events,activeEvent} = useSelector(state => state.calendar)

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

    const onSelectSlot=(e)=>{
        dispatch(eventClearActive())
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
            onSelectSlot={onSelectSlot}
            selectable={true}
            scrollToTime={moment().set({ h: 10, m: 0 }).toDate()}
            onView={onViewChange}
            view={lastView}
            components={{
                event:CalendarEvent
            }}
            />
            <AddNewFab/>
            {
            activeEvent &&
            <DeleteEventFab/>
            }
            <CalendarModal/>
        </div>
    )
}

export default CalendarScreen
