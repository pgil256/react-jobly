import React, { useContext, useState } from 'react';
import UserContext from '../auth/UserContext';

function JobCard({ id, title, salary, equity, companyName }) {

  const { hasApplied, apply } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    setApplied(hasApplied(id));
  }, [id, hasApplied]);

  async function handleApply(evt) {
    if (hasApplied(id)) return;
    apply(id);
    setApplied(true);
  }

  return (
      <div> {applied}
        <div>
          <h6>{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
          <button
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
  );
}

function formatSalary(salary) {
  const digitsReversed = [];
  const salaryString = salary.toString();

  for (let i = salaryString.length - 1; i >= 0; i--) {
    digitsReversed.push(salaryString[i]);
    if (i > 0 && i % 3 === 0) digitsReversed.push(',');
  }
  return digitsReversed.reverse().join('');
}

export default JobCard;
