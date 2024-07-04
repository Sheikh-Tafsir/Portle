import React, { useState } from 'react';
import {useParams} from "react-router-dom";
// import PortHeromain from './heromain/PortHeromain';
import PortAbout from './about/PortAbout';
import PortProjects from './projects/PortProjects';
import PortExperience from './experience/PortExperience';
import PortHeromain2 from './heromain/PortHeromain2';
import CopyRight from '@/mycomponents/copyright/CopyRight';

const Portfolio = () => {
  const { name } = useParams();
  const [id, setId] = useState(null);

  const changeId = (newId) => {
    setId(newId);
  };

  return (
    <div>
      <PortHeromain2 changeId={changeId} username={name}/>
      {/* <PortAbout userId={id}/> */}
      <PortProjects userId={id}/>
      <PortExperience userId={id}/>
      <CopyRight/>
    </div>
  );
};

export default Portfolio;
