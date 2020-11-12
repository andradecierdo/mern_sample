import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps, navigate } from '@reach/router'
import { MdEmail } from 'react-icons/all';
import { Button } from '../../../common';
import { register as userRegisterMutation } from '../apollo/mutations'
import { routes } from '../../../common/constants'
import IUserInputForm from '../../../interfaces/apollo/IUserInputForm';

const SignUpPage: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const { handleSubmit, register, setError, errors, clearErrors } = useForm()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setPassword(value)
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setConfirmPassword(value)
  }

  const onSubmit = values => handleRegisterUser(values);

  const [userRegister] = userRegisterMutation({
    onCompleted() {
      navigate(routes.homepage)
    },
  })

  useEffect((): void => {
    if (password !== confirmPassword && confirmPassword !== '' && password !== '') {
      setError('password_confirm', {
        type: 'manual',
        message: 'Passwords do not match!'
      })
    } else {
      clearErrors('password_confirm')
    }
  }, [password, confirmPassword])

  const handleRegisterUser = (userInput: IUserInputForm): void => {
    event.preventDefault()
    const { address, email, password, name, type } = userInput

    userRegister({
      variables: {
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
          <h1>Sign Up</h1>
        </div>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <div className='body'>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18} /> Email
              </label>
              <input
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
                <MdEmail className='icon-dark' size={18} /> Name
              </label>
              <input
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
                <MdEmail className='icon-dark' size={18} /> Address
              </label>
              <input
                name='address'
                ref={register({
                  required: 'Required',
                })}
              />
              {errors.address && errors.address.message}
            </div>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18} /> Type
              </label>
              <input
                name='type'
                ref={register({
                  required: 'Required',
                })}
              />
              {errors.type && errors.type.message}
            </div>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18} /> Password
              </label>
              <input
                value={password}
                type='password'
                name='password'
                onChange={handlePasswordChange}
                ref={register({
                  required: 'Required',
                  minLength: 4,
                  maxLength: 20,
                })}
              />
              {errors.password && errors.password.message}
            </div>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18} /> Confirm Password
              </label>
              <input
                value={confirmPassword}
                type='password'
                name='password_confirm'
                onChange={handleConfirmPasswordChange}
                ref={register({
                  required: 'Required',
                  minLength: 4,
                  maxLength: 20,
                })}
              />
              {errors.password_confirm && errors.password_confirm.message}
            </div>
          </div>
          <div className='footer text-center'>
            <Button type='submit' style='primary' size='large'>Submit</Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default SignUpPage
