import React, { Fragment, useContext } from 'react'
import Contact from './Contact'
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
	const contactContext = useContext(ContactContext),
		{ contacts, filtered } = contactContext

	if (contacts.lenght === 0) return <h4>No contacts yet</h4>

	return (
		<Fragment>
			{filtered !== null ? (
				filtered.map((contact) => <Contact key={contact.id} contact={contact} />)
			) : (
				contacts.map((contact) => <Contact key={contact.id} contact={contact} />)
			)}
		</Fragment>
	)
}

export default Contacts
