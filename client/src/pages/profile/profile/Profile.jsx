import PortAbout from '@/pages/portfolio/about/PortAbout'
import PortExperience from '@/pages/portfolio/experience/PortExperience'
import PortHeromain from '@/pages/portfolio/heromain/PortHeromain'
import PortProjects from '@/pages/portfolio/projects/PortProjects'
import React from 'react'

const Profile = () => {
  return (
    <div>
      <PortHeromain />
      <PortAbout />
      <PortProjects />
      <PortExperience />
    </div>
  )
}

export default Profile