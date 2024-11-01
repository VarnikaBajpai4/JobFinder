import React, { useState } from 'react';

const EmployerDetails = () => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [workArrangement, setWorkArrangement] = useState('');

  const handleCompanyLogoChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to the backend
  };

  return (
    <div>
      <h2>Employer Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Company Logo:
          <input type="file" onChange={handleCompanyLogoChange} />
        </label>

        <label>
          Company Name:
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>

        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>
          Industry:
          <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        </label>

        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Website:
          <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>

        <label>
          Preferred Experience Level:
          <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
            <option value="">Select Experience Level</option>
            <option value="entry-level">Entry-level</option>
            <option value="mid-level">Mid-level</option>
            <option value="senior">Senior</option>
          </select>
        </label>

        <label>
          Work Arrangement:
          <select value={workArrangement} onChange={(e) => setWorkArrangement(e.target.value)}>
            <option value="">Select Work Arrangement</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployerDetails;
