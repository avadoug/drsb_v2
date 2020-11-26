import axios from 'axios'
import {  USER_CONTACT_FAIL,
    USER_CONTACT_REQUEST,
    USER_CONTACT_SUCCESS,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_FAIL,
    
   } from '../constants/userConstants.js'

export const contact = (name, email, content) => async (dispatch) => {
    try {
      dispatch({
        type: USER_CONTACT_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/contact',
        { name, email, content },
        config
      )
  
      dispatch({
        type: USER_CONTACT_SUCCESS,
        payload: data,
      })
  
      dispatch({
        type: USER_CONTACT_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: USER_CONTACT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const listContacts = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: CONTACT_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { contacts } = await axios.get(`/api/contacts`, config)
  
      dispatch({
        type: CONTACT_LIST_SUCCESS,
        payload: contacts,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      
      dispatch({
        type: CONTACT_LIST_FAIL,
        payload: message,
      })
    }
  }


  
export const deleteContact = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/contact/${id}`, config)

    dispatch({ type: CONTACT_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
   
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload: message,
    })
  }
}