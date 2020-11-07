import { FaKey, IoIosLock, MdEmail } from 'react-icons/all'
import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
  ReactElement,
  useState,
} from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { Button } from '../../../common'
import Cookies from 'js-cookie'
import { IAuth } from '../../../interfaces'
import { routes } from '../../../common/constants'
import { userLogin } from '../../../apollo/mutations'
import './styles.css'

const LoginPage: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [login] = userLogin({
    onCompleted(data: { userLogin: IAuth }) {
      if (data.userLogin._id !== null) {
        Cookies.set('auth', JSON.stringify(data.userLogin), { expires: 30 })
        navigate(routes.homepage)
      } else {
        setErrorMessage('Invalid Credentials!')
      }
    },
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setEmail(value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setPassword(value)
  }

  const handleSignIn = (event: FormEvent<HTMLFormElement> | MouseEvent): void => {
    event.preventDefault()
    login({
      variables: { email, password },
    })
  }

  return (
    <div className='login-container'>
      <div id='login'>
        <div className='header'>
          <h1>MERN Sample App</h1>
          {errorMessage && <h4 className='error-message'>{errorMessage}</h4>}
        </div>
        <form autoComplete='off' onSubmit={handleSignIn}>
          <div className='body'>
            <div className='form-row'>
              <label>
                <MdEmail className='icon-dark' size={18} /> Email
              </label>
              <input
                type='text'
                onChange={handleEmailChange}
                placeholder='Input your email'
                value={email}
              />
            </div>
            <div className='form-row'>
              <label>
                <IoIosLock className='icon-dark' size={18} /> Password
              </label>
              <input
                autoComplete='true'
                onChange={handlePasswordChange}
                placeholder='Input your password'
                type='password'
                value={password}
              />
            </div>
          </div>
          <div className='footer text-center'>
            <Button style='primary' size='large' onClick={handleSignIn}>
              <FaKey className='icon-light' size={18} /> Login
            </Button>
            <br />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
