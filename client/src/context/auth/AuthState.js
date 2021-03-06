import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_ERRORS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
	// CLEAR_ERRORS
} from '../types'

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	}

	const [ state, dispatch ] = useReducer(authReducer, initialState)

	// Load user
	const loadUser = async () => {
		if (localStorage.token) setAuthToken(localStorage.token)

		try {
			const res = await axios.get('/api/auth')

			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		} catch (err) {
			dispatch({ type: AUTH_ERROR })
		}
	}

	// Get token
	const getToken = async (formData, url, successAction, failAction) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post(url, formData, config)

			dispatch({
				type: successAction,
				payload: res.data
			})

			loadUser()
		} catch (err) {
			dispatch({
				type: failAction,
				payload: err.response.data.msg
			})
		}
	}

	// Register user
	const register = (formData) => getToken(formData, '/api/users', REGISTER_SUCCESS, REGISTER_FAIL)

	// Login user
	const login = (formData) => getToken(formData, '/api/auth', LOGIN_SUCCESS, LOGIN_FAIL)

	// Logout
	const logout = () => dispatch({ type: LOGOUT })

	// Clear errors
	const clearErrors = () =>
		dispatch({
			type: CLEAR_ERRORS
		})

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				login,
				logout,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
