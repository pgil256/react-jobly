import React, { useState } from 'react';

function Search({ searchFor }) {

  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }


  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
              name='searchTerm'
              placeholder=''
              value={searchTerm}
              onChange={handleChange}
          />
          <button type='submit'>
            Submit
          </button>
        </form>
      </div>
  );
}

export default Search;
