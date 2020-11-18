import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
// eslint-disable-next-line sort-imports
import { Assignment, AssignmentInd, Email, PanTool } from '@material-ui/icons'
import { IQuery, IUser } from '../../../../interfaces'
import { Button } from '../../../../common'
import IUserInputForm from '../../../../interfaces/apollo/IUserInputForm'
import { getUser as getUserQuery } from '../../apollo/queries'
import { routes } from '../../../../common/constants'
import { useForm } from 'react-hook-form'
import { update as userUpdateMutation } from '../../apollo/mutations'

const EditPage: FunctionComponent<RouteComponentProps> = (props: {
  userId: string
}): ReactElement => {
  const { handleSubmit, register, errors } = useForm()
  const { userId } = props

  const userQueryResult: IQuery<IUser> = getUserQuery(userId)
  const { data: user, loading } = userQueryResult

  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  useEffect((): void => {
    if (!loading && user) {
      setEmail(user.email)
      setAddress(user.address)
      setName(user.name)
      setType(user.type)
    }
  }, [user])

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
        name,
        password,
        type,
      },
    })
  }

  const onSubmit = (values: IUserInputForm): void => {
    handleUpdateUser(values)
  }

  return (
    <React.Fragment>
      <div id='login'>
        <div className='header'>
          <h1>Edit User</h1>
        </div>
        {user && !loading && (
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <div className='body'>
              <div className='form-row'>
                <label>
                  <Email fontSize='small' /> Email
                </label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  name='email'
                  ref={register({
                    pattern: {
                      message: 'Invalid Email Address',
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    },
                    required: 'Required',
                  })}
                />
                {errors.email && errors.email.message}
              </div>
              <div className='form-row'>
                <label>
                  <AssignmentInd fontSize='small' /> Name
                </label>
                <input
                  onChange={handleNameChange}
                  value={name}
                  name='name'
                  ref={register({
                    maxLength: 20,
                    minLength: 4,
                    required: 'Required',
                  })}
                />
                {errors.name && errors.name.message}
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'The name should have at least 4 characters'}
                {errors.name &&
                  errors.name.type === 'maxLength' &&
                  'The name should not exceed to 20 characters'}
              </div>
              <div className='form-row'>
                <label>
                  <Assignment fontSize='small' /> Address
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
                  <PanTool fontSize='small' /> Type
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
              <Button type='submit' style='primary' size='large'>
                Update
              </Button>
            </div>
          </form>
        )}
      </div>
    </React.Fragment>
  )
}

export default EditPage
