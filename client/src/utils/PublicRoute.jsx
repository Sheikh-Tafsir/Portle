import NavigationBar from '@/mycomponents/navbar/NavigationBar'
import React from 'react'
import { Outlet} from 'react-router-dom'

const PublicRoute = () => {
    return(
        <>
          <NavigationBar />
          <Outlet/> 
        </>
    )
}

export default PublicRoute