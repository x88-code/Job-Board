import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    type: "full-time",
    salary: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data.jobs || []);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit job form
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/jobs", form, { withCredentials: true });
      // Refresh job list after post
      const res = await axios.get("/api/jobs");
      setJobs(res.data.jobs || []);
      setForm({
        title: "",
        description: "",
        company: "",
        location: "",
        type: "full-time",
        salary: ""
      });
    } catch (err) {
      alert("Error posting job. Are you logged in?");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
      <form onSubmit={handlePost} className="mb-8 grid gap-3">
        {["title", "description", "company", "location", "salary"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="border p-2 rounded"
            required
          />
        ))}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Post Job
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">All Jobs</h3>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="p-4 bg-white shadow rounded">
              <h4 className="text-lg font-bold">
                {job.title} at {job.company}
              </h4>
              <p className="text-sm">{job.location} – {job.type}</p>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-sm text-green-600 font-medium">${job.salary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
