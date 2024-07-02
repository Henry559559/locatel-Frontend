import { 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    LOGOUT
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

function getCSRFToken() {
    let cookieValue = null;
    const name = 'csrftoken';
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const check_authenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch(refreshToken());
            }
        } catch (err) {
            dispatch(refreshToken());
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const signup = (
    email, first_name, last_name, dni, telefono, direccion, password, re_password) => async dispatch => {
    
    dispatch({
        type: SET_AUTH_LOADING
    });

    const csrfToken = getCSRFToken();
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

    const body = JSON.stringify({
        email,
        first_name,
        last_name,
        dni,
        telefono, 
        direccion,
        password, 
        re_password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Te Enviamos Un Correo Por Favor Activa La Cuenta', 'green'));
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert('Error Al Crear La Cuenta', 'red'));
        }
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch(setAlert('Error Conectando Con El Servidor, Intenta Mas Tarde', 'red'));
    } finally {
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
};

export const load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const login = (email, password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
    
        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);

            dispatch(load_user());
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Inicio de sesión con éxito', 'green'));
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error al iniciar sesion.', 'red'));
        }
    }
    catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error al iniciar sesion. Intenta mas tarde', 'red'));
    }
}


export const activate = (uid, token) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const csrfToken = getCSRFToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Cuenta Activada Correctamente', 'green'));
        } else {
            dispatch({
                type: ACTIVATION_FAIL
            });
            dispatch(setAlert('Error Activando Cuenta', 'red'));
        }
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
        dispatch(setAlert('Error Conectando Con El Servidor, Intenta Más Tarde', 'red'));
    } finally {
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
};

export const refreshToken = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });

                localStorage.setItem('refresh', res.data.refresh);
                localStorage.setItem('access', res.data.access);
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
            }
        } catch (err) {
            dispatch({
                type: REFRESH_FAIL
            });
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}


export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        
        if (res.status === 204) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Password reset email sent', 'green'));
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error sending password reset email', 'red'));
        }
    }
    catch(err){
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error sending password reset email', 'red'));
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    });

    if (new_password !== re_new_password) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Passwords do not match', 'red'));
    } else {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        
            if (res.status === 204) {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_SUCCESS
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Password has been reset successfully', 'green'));
            } else {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Error resetting your password', 'red'));
            }
        } catch(err){
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error resetting your password', 'red'));
        }
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Succesfully logged out', 'green'));
}