import React, { useState, useEffect } from 'react';
import Search from '../common/Search';
import JoblyApi from '../api/api';
import JobCards from './JobCards';

function Jobs() {

  const [jobs, setJobs] = useState(null);

  useEffect(function getAllJobsOnMount() {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }


  return (
      <div>
        <Search searchFor={search} />
        {jobs.length
            ? <JobCards jobs={jobs} />
            : <p>No results.</p>
        }
      </div>
  );
}

export default Jobs;
