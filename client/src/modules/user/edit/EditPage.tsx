import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps, navigate } from '@reach/router'
import { MdEmail } from 'react-icons/all'
import { Button } from '../../../common'
import { update as userUpdateMutation } from '../apollo/mutations'
import { getUser as getUserQuery } from '../apollo/queries'
import { routes } from '../../../common/constants'
import IUserInputForm from '../../../interfaces/apollo/IUserInputForm'
import {IQuery, IUser} from '../../../interfaces'

const EditPage: FunctionComponent<RouteComponentProps> = (props: { userId: string}): ReactElement => {
  const { handleSubmit, register, errors } = useForm();
  const { userId } = props

  const userQueryResult: IQuery<IUser> = getUserQuery(userId)
  const { data: user, loading } = userQueryResult

  useEffect((): void => {
    if (!loading && user) {
      setEmail(user.email)
      setAddress(user.address)
      setName(user.name)
      setType(user.type)
    }
  }, [user])

  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  const onSubmit = values => handleUpdateUser(values);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setEmail(value)
  }
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setAddress(value)
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setName(value)
  }
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setType(value)
  }

  const [userUpdate] = userUpdateMutation({
    onCompleted() {
      navigate(routes.usersPage)
    },
  })

  const handleUpdateUser = (userInput: IUserInputForm): void => {
    event.preventDefault()
    const { address, email, password, name, type } = userInput

    userUpdate({
      variables: {
        _id: userId,
        address,
        email,
        password,
        name,
        type,
      },
    })
  }

  return (
    <React.Fragment>
      <div id='login'>
        <div className='header'>
          <h1>Edit User</h1>
        </div>
        {user && !loading &&
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <div className='body'>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18}/> Email
              </label>
              <input
                onChange={handleEmailChange}
                value={email}
                name='email'
                ref={register({
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid Email Address'
                  }
                })}
              />
              {errors.email && errors.email.message}
            </div>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18}/> Name
              </label>
              <input
                onChange={handleNameChange}
                value={name}
                name='name'
                ref={register({
                  required: 'Required',
                  minLength: 4,
                  maxLength: 20,
                })}
              />
              {errors.name && errors.name.message}
              {errors.name && errors.name.type === 'minLength' && 'The name should have at least 4 characters'}
              {errors.name && errors.name.type === 'maxLength' && 'The name should not exceed to 20 characters'}
            </div>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18}/> Address
              </label>
              <input
                onChange={handleAddressChange}
                value={address}
                name='address'
                ref={register({
                  required: 'Required',
                })}
              />
              {errors.address && errors.address.message}
            </div>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18}/> Type
              </label>
              <input
                onChange={handleTypeChange}
                value={type}
                name='type'
                ref={register({
                  required: 'Required',
                })}
              />
              {errors.type && errors.type.message}
            </div>
          </div>
          <div className='footer text-center'>
            <Button type='submit' style='primary' size='large'>Update</Button>
          </div>
        </form>
        }
      </div>
    </React.Fragment>
  )
}

export default EditPage
