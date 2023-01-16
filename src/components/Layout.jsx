import { Outlet } from "react-router-dom"
import Header from "./Header"

//Creating outlet layout, we can include footer, header components here. 
//Outlet represents all of childrens

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App" >
        <Outlet />
      </main >
    </>
  )
}

export default Layout