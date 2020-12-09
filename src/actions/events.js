import types from "../types/types";

export const eventAddnew = (event) => ({
    type: types.eventAddNew,
    payload:event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload:event
})