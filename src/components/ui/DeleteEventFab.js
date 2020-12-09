import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { eventDeleted } from '../../actions/events'

const DeleteEventFab = () => {
    const dispatch = useDispatch()

    const handleDelete=()=>{
        dispatch(eventDeleted())
        Swal.fire('Evento borrado', 'EL evento se ha borrado con exito','success')
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
        </button>
    )
}

export default DeleteEventFab
