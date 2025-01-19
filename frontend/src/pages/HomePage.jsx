import Report from '../components/Report'
import Bottombar from '../components/Bottombar'
import { useReportStore } from '../store/useReportStore';
import { useEffect } from 'react';

const HomePage = () => {
  const {reports, getReports, getGeoHash, loadingReports, upvote, downvote, subscribeToReports, subscribeToVotes} = useReportStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      getGeoHash(lat, long);
    })
    getReports();
    // subscribeToReports();
    // subscribeToVotes();
  }, [getGeoHash, getReports, subscribeToReports, subscribeToVotes])
  
  return (
    <div className="flex flex-col items-center bg-base-200 px-4 pt-8 pb-16 space-y-6">
    <div className="w-full md:w-3/5 space-y-4">
      {reports.map((report) => (
        <Report key={report._id} />
      ))}
    </div>
  
      <Bottombar />
    </div>
  
    
  );
};

export default HomePage;
