import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from 'moment'
import Swal from 'sweetalert2';

import "../../css/modal.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction } from "../../actions/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    color: "rgb(51, 51, 51)",
    height: "580px",
    width: "500px",
    display: "inline",
  },
};

Modal.setAppElement("#root");

const now=moment().minutes(0).seconds(0).add(1,'hours')

const CalendarModal = () => {

    const dispatch = useDispatch()

    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(now.add(1,'hours').toDate())

    const [titleValid, settitleValid] = useState(true)

    const [formValues, setformValues] = useState({
        title:'Evento title',
        notes:'',
        start:now.toDate(),
        end:now.add(1,'hours').toDate()
    })

    const {title,notes,start,end}=formValues

    const {modalOpen} = useSelector(state => state.ui)

  const closeModal = () => {
    dispatch(closeModalAction())
  };

  const handleStartDateChange=(e)=>{
    setDateStart(e)
    setformValues({
        ...formValues,
        start:e
    })
  }

  const handleEndDateChange=(e)=>{
    setDateEnd(e)
    setformValues({
        ...formValues,
        end:e
    })
  }

  const handleInputChange=({target})=>{
    setformValues({
        ...formValues,
        [target.name]:target.value
    })
  }

  const handleSubmitForm=(e)=>{
      e.preventDefault()

      const momentStart=moment(start)
      const momentEnd=moment(end)

      if(momentStart.isSameOrAfter(momentEnd)){
          Swal.fire('Error','La fecha fin debe ser mayor a la fecha de inicio','error')
          return
      }

      if(title.trim().length<2){
        settitleValid(false)
        return;
      }

      //guardar en base de datos
      settitleValid(true)
      closeModal()

  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        overlayClassName="modal-fondo"
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              className="form-control"
              onChange={handleStartDateChange}
              value={dateStart}
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              className="form-control"
              onChange={handleEndDateChange}
              value={dateEnd}
              minDate={dateStart}
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${!titleValid && 'is-invalid'}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              is
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="2"
              name="notes"
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CalendarModal;