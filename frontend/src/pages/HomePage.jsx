import Report from '../components/Report'
import Bottombar from '../components/Bottombar'

const HomePage = () => {
  const reports = [1, 2, 3]; 
  
  return (
    <div className="flex flex-col items-center bg-base-200 px-4 pt-8 pb-16 space-y-6">
    <div className="w-full md:w-3/5 space-y-4">
      {reports.map((report, index) => (
        <Report key={index} />
      ))}
    </div>
  
      <Bottombar />
    </div>
  
    
  );
};

export default HomePage;
