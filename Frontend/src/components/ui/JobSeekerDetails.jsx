import React, { useState } from 'react';

const JobSeekerDetails = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState([]);

  const skillOptions = ['JavaScript', 'Python', 'Project Management', 'React', 'Node.js', 'SQL'];

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setSkills((prevSkills) =>
      prevSkills.includes(value) ? prevSkills.filter((skill) => skill !== value) : [...prevSkills, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to the backend
  };

  return (
    <div>
      <h2>Job Seeker Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Picture:
          <input type="file" onChange={handleProfilePictureChange} />
        </label>

        <label>
          Resume:
          <input type="file" onChange={handleResumeChange} />
        </label>

        <label>
          Job Type:
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Select Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="freelance">Freelance</option>
          </select>
        </label>

        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>

        <label>
          Industry:
          <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        </label>

        <fieldset>
          <legend>Skills</legend>
          {skillOptions.map((skill) => (
            <label key={skill}>
              <input
                type="checkbox"
                value={skill}
                checked={skills.includes(skill)}
                onChange={handleSkillChange}
              />
              {skill}
            </label>
          ))}
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobSeekerDetails;
