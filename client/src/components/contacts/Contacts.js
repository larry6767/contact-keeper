import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Spinner from '../layout/Spinner'
import Contact from './Contact'
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
	const contactContext = useContext(ContactContext)

	const { contacts, filtered, getContacts, loading } = contactContext

	useEffect(() => {
		getContacts()
		// eslint-disable-next-line
	}, [])

	if (contacts !== null && contacts.length === 0) return <h4>There are no contacts yet</h4>

	const renderContact = (contact) => (
		<CSSTransition key={contact._id} timeout={500} classNames='item'>
			<Contact contact={contact} />
		</CSSTransition>
	)

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null ? filtered.map(renderContact) : contacts.map(renderContact)}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}

export default Contacts
