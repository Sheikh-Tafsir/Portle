import React, { useState } from 'react';
import {useUserContext} from '../../../context/UserContext';
import PortAbout from '@/pages/portfolio/about/PortAbout'
import PortExperience from '@/pages/portfolio/experience/PortExperience'
import PortHeromain from '@/pages/portfolio/heromain/PortHeromain'
import PortProjects from '@/pages/portfolio/projects/PortProjects'
import ProfileProjectsCreateGithub from '@/pages/portfolio/projects/ProfileProjectsCreateGithub';
import CopyRight from '@/mycomponents/copyright/CopyRight';

const Profile = () => {
  const {userInfo, setUserInfo} = useUserContext();
  const [id, setId] = useState(null);

  const changeId = (newId) => {
    setId(newId);
  };

  return (
    <div>
      <PortHeromain changeId={changeId} />
      {/* <PortAbout userId={userInfo.id}/> */}
      <PortProjects userId={userInfo.id}/>
      <PortExperience userId={userInfo.id}/>
      <CopyRight/>
    </div>
  )
}

export default Profile