import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Contact from './Contact'
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
	const contactContext = useContext(ContactContext),
		{ contacts, filtered } = contactContext

	if (contacts.lenght === 0) return <h4>No contacts yet</h4>

	const renderContact = (contact) => (
		<CSSTransition key={contact.id} timeout={500} classNames='item'>
			<Contact contact={contact} />
		</CSSTransition>
	)

	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null ? filtered.map(renderContact) : contacts.map(renderContact)}
			</TransitionGroup>
		</Fragment>
	)
}

export default Contacts
