import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import { useAuthStore } from "../store/useAuthStore";
import { useReportStore } from "../store/useReportStore";

const NewsletterPage = () => {

  const {geohash} = useAuthStore();
  const [currGeohash, setCurrGeohash] = useState(geohash);
  const {loadedNewsletter, getNewsletter} = useReportStore();

  useEffect(() => {
    getNewsletter({location: location, date: new Date()});
  }, [loadedNewsletter, getNewsletter])

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Newsletter</h1>
      <MapComponent />
      <h1>{loadedNewsletter.data.title}</h1>
      <p>{loadedNewsletter.data.content}</p>
    </div>
  );
};

export default NewsletterPage;
