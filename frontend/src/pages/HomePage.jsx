import Report from '../components/Report'
import { useAuth0 } from '@auth0/auth0-react'

const HomePage = () => {

  const { loginWithRedirect } = useAuth0();

  return (
    <div className='flex'>
        <Report />
        <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  )
}

export default HomePage