import types from "../types/types";
import moment from "moment";

const initialState = {
  events: [
    {
      title: "Cumpleanos del jefe",
      start: moment().add(-10, "hours").toDate(),
      end: moment().add(-7, "hours").toDate(),
      bgcolor: "#7e3434",
      notes: "Comprar el pastel",
      user: {
        _id: "12345",
        name: "fernando",
      },
    },
  ],
  activeEvent: null,
};

const calendarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case types.eventSetActive:
      return {
        ...state,
        activeEvent:payload
      };
    case types.eventCleanActive:
        return{
            ...state,
            activeEvent:null
        }

    default:
      return state;
  }
};

export default calendarReducer;
