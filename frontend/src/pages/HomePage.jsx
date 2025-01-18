import Report from '../components/Report'
import { useAuth0 } from '@auth0/auth0-react'

const HomePage = () => {
  const { loginWithRedirect } = useAuth0();
  const reports = [1, 2, 3]; 
  
  return (
    <div className="flex flex-col items-center bg-base-200 px-4 pt-8 space-y-6">
      <div className="w-full md:w-3/5 space-y-4">
        {reports.map((report, index) => (
          <Report key={index} />
        ))}
      <button onClick={() => loginWithRedirect()}>Login</button>
      </div>
    </div>
  );
};

export default HomePage;
