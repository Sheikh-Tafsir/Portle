import React, { useState } from 'react';
import {useUserContext} from '../../../context/UserContext';
import PortExperience from '@/pages/portfolio/experience/PortExperience'
import PortHeromain from '@/pages/portfolio/heromain/PortHeromain'
import PortProjects from '@/pages/portfolio/projects/PortProjects'
import CopyRight from '@/mycomponents/copyright/CopyRight';

const Profile = () => {
  const {userInfo} = useUserContext();
  const [id, setId] = useState(null);

  const changeId = (newId) => {
    setId(newId);
  };

  return (
    <div>
      <PortHeromain changeId={changeId} />
      <PortProjects userId={userInfo.id}/>
      <PortExperience userId={userInfo.id}/>
      <CopyRight/>
    </div>
  )
}

export default Profile