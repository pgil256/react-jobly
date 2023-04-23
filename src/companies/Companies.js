import React, { useState, useEffect } from 'react';
import Search from '../common/Search';
import JoblyApi from '../api/api';
import CompanyCard from './CompanyCard';

function Companies() {

  const [companies, setCompanies] = useState(null);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  return (
      <div>
        <Search searchFor={search} />
        {companies.length
            ? (
                <div>
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p>No result found.</p>
            )}
      </div>
  );
}

export default Companies;