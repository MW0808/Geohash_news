import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import { useAuthStore } from "../store/useAuthStore";
import { useReportStore } from "../store/useReportStore";

const NewsletterPage = () => {
  const { geohash } = useAuthStore();
  const [currGeohash, setCurrGeohash] = useState(geohash);
  const { loadedNewsletter, getNewsletter } = useReportStore();

  useEffect(() => {
    setCurrGeohash(geohash);
  }, [geohash]);


  useEffect(() => {
    getNewsletter({ location: currGeohash, date: new Date() });
  }, [currGeohash, getNewsletter]);

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Newsletter</h1>
      <MapComponent />
      {loadedNewsletter ? (
        <>
          <h1>{loadedNewsletter.data.title}</h1>
          <p>{loadedNewsletter.data.content}</p>
        </>
      ) : (
        <p>Loading newsletter...</p>
      )}
    </div>
  );
};

export default NewsletterPage;
