import React, { Fragment, useContext } from 'react'
import Contact from './Contact'
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
  const
    contactContext = useContext(ContactContext),
    { contacts } = contactContext

  return (
    <Fragment>
      {contacts.map(contact => <Contact key={contact.id} contact={contact} />)}
    </Fragment>
  )
}

export default Contacts
