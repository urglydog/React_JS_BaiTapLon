import React from 'react';
import ProfileCard from './ProfileCard';
import   './TeamProfiles.css';
import taki from "../../../assets/taro.png";

const TeamProfiles = () => {
  // Array of team member data
  const teamMembers = [
    {
      id: 1,
      name: "Thach Taro",
      role: "Full stack developers",
      masterRole: "Master in Frontend Developer",
      location: "VietNam",
      image: taki,
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 2,
      name: "Tung",
      role: "Full stack developers",
      masterRole: "Master in Backend Architecture",
      location: "VietNam",
      image: "/assets/img/member2.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 3,
      name: "Thien",
      role: "Full stack developers",
      masterRole: "Master in User Experience",
      location: "VietNam",
      image: "/assets/img/member3.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    }
  ];

  return (
    <div className="teamContainer">
      <h2 className="teamTitle">Team 01</h2>
      <div className="teamProfiles">
        {teamMembers.map((member) => (
          <ProfileCard key={member.id} memberData={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamProfiles;