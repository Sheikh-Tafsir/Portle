import React from 'react'
import PortHeromain from './heromain/PortHeromain'
import PortAbout from './about/PortAbout'
import PortProjects from './projects/PortProjects'
import PortExperience from './experience/PortExperience'

const Portfolio = () => {
  return (
    <div>
        <PortHeromain/>
        <PortAbout />
        <PortProjects />
        <PortExperience />
    </div>
  )
}

export default Portfolio