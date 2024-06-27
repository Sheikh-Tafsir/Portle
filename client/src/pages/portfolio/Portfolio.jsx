import React from 'react'
import PortHeromain from './heromain/PortHeromain'
import PortAbout from './about/PortAbout'
import PortProjects from './projects/PortProjects'

const Portfolio = () => {
  return (
    <div>
        <PortHeromain/>
        <PortAbout />
        <PortProjects />
    </div>
  )
}

export default Portfolio