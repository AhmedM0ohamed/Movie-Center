import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar }  from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Movies } from "./components/Movies/Movies";
import { TvShows } from "./components/TvShows/TvShows";
import { MovieDetails } from "./components/MovieDetails/MovieDetails";
import jwtDecode from "jwt-decode";
import { APIContextProvider } from "./Context/APIContext";

function App() {

  function TestingRoute( props ){
    if(localStorage.getItem("token") == null){
      return <Navigate to='/login'/>
    }
    else{
      return props.children;
    }
  }
  const navigate = useNavigate();
  const [currentUser , setCurrentUser] = useState(null);
  function decodeToken(){
    let user = jwtDecode(localStorage.getItem("token"));
    setCurrentUser( user );
  }
  function clearUserData(){
    setCurrentUser( null );
    localStorage.removeItem("token");
    navigate('/login');
  }
  useEffect( () => {
    if(localStorage.getItem("token") != null ){
      decodeToken();
    } 
    else{
    }
  } , []);
  return <>
    <Navbar currentUser = { currentUser } clearUserData = { clearUserData }/>
    <APIContextProvider>
      <Routes>
        <Route path='' element={<Home/>} />
        <Route path='home' element={<TestingRoute> <Home/> </TestingRoute>} />
        <Route path='movies' element={ <TestingRoute> <Movies/> </TestingRoute> }/>
        <Route path='moviedetails' element={<TestingRoute><MovieDetails /> </TestingRoute>} >
          <Route path=':id' element={<MovieDetails />} />
        </Route>
        <Route path='tv' element={<TestingRoute> <TvShows/> </TestingRoute>} />
        <Route path='login' element={<Login decode = {decodeToken}/>} />
        <Route path='register' element={<Register/>} />
        <Route path='*' element={<> <div className="vh-100 d-flex align-items-center justify-content-center"> 
          <h1> 4 0 4 </h1>
        </div> </>} />
      </Routes>
    </APIContextProvider>
    
  </>
}
export default App;
