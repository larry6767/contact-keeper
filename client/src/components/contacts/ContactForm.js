import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
	const contactContext = useContext(ContactContext)

	const { addContact, clearCurrent, updateContact, current } = contactContext

	useEffect(
		() => {
			if (current !== null) setContact(current)
			else setContact(defaultState)
		},
		[ contactContext, current ]
	)

	const defaultState = {
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	}

	const [ contact, setContact ] = useState(defaultState)

	const { name, email, phone, type } = contact

	const onChange = (e) =>
		setContact({
			...contact,
			[e.target.name]: e.target.value
		})

	const onSubmit = (e) => {
		e.preventDefault()

		if (!current) addContact(contact)
		else updateContact(contact)

		setContact(defaultState)
	}

	const onCancel = () => clearCurrent()

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
			<input type='text' name='name' placeholder='Name' value={name} onChange={onChange} />
			<input
				type='email'
				name='email'
				placeholder='Email'
				value={email}
				onChange={onChange}
			/>
			<input type='text' name='phone' placeholder='Phone' value={phone} onChange={onChange} />
			<h5>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === 'personal'}
				onChange={onChange}
			/>{' '}
			Personal {' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChange}
			/>{' '}
			professional {' '}
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{!current ? null : (
				<button className='btn btn-light btn-block' onClick={onCancel}>
					Cancel
				</button>
			)}
		</form>
	)
}

export default ContactForm
