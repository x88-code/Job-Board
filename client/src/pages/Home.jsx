import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data.jobs || []);
      } catch (err) {
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">
        Welcome to the Job Board
      </h1>
      <p className="text-lg text-gray-700 text-center mb-10">
        Discover the latest opportunities across industries.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-600">Job listings available soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600 mb-1">{job.company} - {job.location}</p>
              <p className="text-sm text-gray-500">{job.type}</p>
              <p className="text-gray-700 mt-2">{job.description.slice(0, 100)}...</p>
              <p className="text-green-700 font-semibold mt-2">${job.salary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
