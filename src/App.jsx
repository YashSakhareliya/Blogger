import { useDispatch } from "react-redux"
import React, {useState, useEffect} from "react"
import {login, logout} from "./store/authSlice"
import authService from "./appwrite/auth"
import {Header, Footer} from "./components"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }else {
        dispatch(logout())
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])
  
  return !loading ? (
    <div className="min-h-screen w-full flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
