import React from 'react'
import Login from './Components/Login'
import Register from './Components/Register'
import DisplayPage from './Components/DisplayPage.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import {store, persistor} from "./Redux/store";
import HomePage from './Components/HomePage.jsx'
import { PersistGate } from "redux-persist/integration/react";
import Update from './Components/Update.jsx'
import Logout from './Components/Logout.jsx'
import ChangePassword from './Components/ChangePassword.jsx';


function App() {

  return (
    <>
    <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Router>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/display' element={<DisplayPage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/update' element={<Update/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/changePassword/:token/:time' element={<ChangePassword/>}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
