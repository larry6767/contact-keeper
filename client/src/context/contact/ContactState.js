import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from '../types'

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				type: 'personal',
				id: '5d9634801c0f43a13e45991b',
				name: 'Mary White',
				email: 'mary@gmail.com',
				phone: '111-111-111',
				date: '1570124928414'
			},
			{
				type: 'professional',
				id: '5d9634671c0f43a13e45991a',
				name: 'Hary White',
				email: 'hary@gmail.com',
				phone: '222-222-222',
				date: '1570124903423'
			}
		],
		current: null
	}

	const [ state, dispatch ] = useReducer(contactReducer, initialState)

	// Add contact
	const addContact = (contact) => {
		contact.id = uuid.v4()
		dispatch({ type: ADD_CONTACT, payload: contact })
	}

	// Delete contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id })
	}

	// Set current contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact })
	}

	// Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT })
	}

	// Update contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact })
	}

	// Filter contacts

	// Clear filter

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact
			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
