import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }

}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwCVbhcWfJQl2SkzBkF4tsCuxV9RuLGLg';

        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwCVbhcWfJQl2SkzBkF4tsCuxV9RuLGLg';
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token)
            dispatch(logout())
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
        }
    }
}