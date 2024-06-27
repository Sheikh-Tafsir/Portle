import React from 'react'
import { Outlet} from 'react-router-dom'

const PublicRoute = () => {
    return(
        <>
          <NavigationBar />
          <Outlet/> 
          <CopyRight/>
        </>
    )
}

export default PublicRoute