import * as types from '../constants/ActionTypes'

export const addNote = text => ({ type: types.ADD_NOTE, text })
export const editNote = (id, text) => ({ type: types.EDIT_NOTE, id, text })
export const deleteNote = id => ({ type: types.DELETE_NOTE, id })
export const moveNote = (id, top, left) => ({ type: types.MOVE_NOTE, id, top, left })