import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listContacts, deleteContact } from '../actions/contactActions'


const ContactListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const contactList = useSelector((state) => state.contactList)
  const { loading, error, contacts } = contactList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const contactDelete = useSelector((state) => state.contactDelete)
  const { success: successDelete } = contactDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listContacts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteContact(id))
    }
  }

  return (
    <>
      <h1>contacts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {contacts.map((c) => (
              <tr key={c._id}>
               
                <td>{c.name}</td>
                <td>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </td>
                <td>{c.content}</td>
                <td>{c.createdAt}</td>
                <td>
                  <LinkContainer to={`/admin/user/${c._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(c._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ContactListScreen
