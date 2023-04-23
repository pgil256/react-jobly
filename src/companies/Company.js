import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import JobCards from '../jobs/JobCards';

function Company() {
  const { handle } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany();
  }, [handle]);


  return (
      <div>
        <h4>{company.name}</h4>
        <p>{company.description}</p>
        <JobCards jobs={company.jobs} />
      </div>
  );
}

export default Company;

