import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext)
	const contactContext = useContext(ContactContext)

	const { isAuthenticated, logout, user } = authContext
	const { clearContacts } = contactContext

	const onLogout = () => {
		logout()
		clearContacts()
	}

	const renderAuthLinks = () => (
		<Fragment>
			<li>Hello {!user ? null : user.name}</li>
			<li>
				<a href='#!' onClick={onLogout}>
					<i className='fas fa-sign-out-alt' /> <span className='hide-sm'>Logout</span>
				</a>
			</li>
		</Fragment>
	)

	const renderGuestLinks = () => (
		<Fragment>
			<Link to='/register'>Register</Link>
			<Link to='/login'>Login</Link>
		</Fragment>
	)

	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? renderAuthLinks() : renderGuestLinks()}</ul>
		</div>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
}

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt'
}

export default Navbar
