import React, { useContext } from 'react'
import { capitalize } from 'lodash'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

const Contact = ({ contact }) => {
	const contactContext = useContext(ContactContext)

	const { deleteContact, setCurrent, clearCurrent } = contactContext

	const { _id, name, email, phone, type } = contact

	const onDelete = (e) => {
		deleteContact(_id)
		clearCurrent()
	}

	const onEdit = () => setCurrent(contact)

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{`${name} `}
				<span
					className={`badge ${type === 'professional'
						? 'badge-success'
						: 'badge-primary'}`}
					style={{ float: 'right' }}
				>
					{capitalize(type)}
				</span>
			</h3>
			<ul className='list'>
				{!email ? null : (
					<li>
						<i className='fas fa-envelope-open' /> {email}
					</li>
				)}
				{!phone ? null : (
					<li>
						<i className='fas fa-phone' /> {phone}
					</li>
				)}
			</ul>
			<p>
				<button className='btn btn-dark btn-sm' onClick={onEdit}>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	)
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired
}

export default Contact
