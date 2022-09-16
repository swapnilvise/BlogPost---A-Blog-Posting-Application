import Topbar from "./Component/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { ReactComponentElement, useReducer } from 'react'
import { reducer, initialState } from './reducer'
import React from "react";
import { useEffect } from "react";
import { createStore } from 'redux'
import { useState } from "react";
import { checkForLoggedInUser, performLogin, performLogout, addUser, deletePost, updatePost, updateUser } from './services'
import SinglePost from "./Component/singlepost/SinglePost";

function App() {
  const [user, setUser] = useState({ name: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [writeButtonClicked, setWriteButtonClicked] = useState(false);
  const [homeButtonClicked, setHomeButtonClicked] = useState(false);
  const [singlePostClicked, setsinglePostClicked] = useState(false);
  const [registerclicked, setregisterclicked] = useState(false);
  const [settingsButtonclicked, setsettingsButtonclicked] = useState(false);
  const [responseok, setResponseOk] = useState(false)
  const [id, setid] = useState('');

  let username = ''

  const initialLoad = () => {
    checkForLoggedInUser().then(
      (response) => {
        if (response.error !== 'cannot find user') {
          setUser({ name: response.username });
          username = response.username;
        }
      }
    ).catch(() => {

    });
    setIsLoading(false);
  }

  const loginHandler = (details) => {
    performLogin(details.name).then(
      (response) => {
        console.log(response);
        if (response === 'Login successful') {
          setUser({ name: details.name });
          console.log(user.name);
        }
      }).catch((error) => {
        setError(error);
      });
  }
  // useEffect(() => {
  //   console.log(state);
  //   setInterval(() => {
  //     console.log('inside app reducer state : ' + state.page);
  //   }, 1000);
  // }, [])

  const Homeclicked = () => {
    setWriteButtonClicked(false);
    setHomeButtonClicked(true);
    setsinglePostClicked(false);
    renderPage();
  }

  const Writeclicked = () => {
    setWriteButtonClicked(true);
    setHomeButtonClicked(false);
    setsinglePostClicked(false);
    setsettingsButtonclicked(false);
    renderPage();
  }

  const Logoutclicked = () => {
    performLogout().then(p => {
      console.log(p);
      if (p === 'Logout successful') {
        setUser({ name: '' });
        setError('')
      }
    });
  }

  const OpenPost = (id) => {
    setError('');
    setsinglePostClicked(true);
    setHomeButtonClicked(false);
    setWriteButtonClicked(false);
    setsettingsButtonclicked(false);
    setid(id);
    console.log(singlePostClicked);
    renderPage();
  }

  const register = () => {
    setError('');
    setregisterclicked(true);
    dispatch({type: 'register'});
  }

  const registerUser = (newUser, userAbout) => {
    addUser(newUser, userAbout).then(
      (r) => {
        setError(r);
        }
      ).catch(err => {setError(err)}); 
  }

  const loginclicked = () => {
    setregisterclicked(false);
    setError('');
    renderLogin();
  }

  const removePost = (id) => {
    deletePost(id).catch(err => {setError(err)});
    
    if (error === '') {
      console.log('here');
      setsinglePostClicked(false);
    }
  }

  const changePost = (id, updatedpost) => {
    updatePost(id, updatedpost);
  }

  const settingclicked = () => {
    setsettingsButtonclicked(true);
    setHomeButtonClicked(false);
    setWriteButtonClicked(false);
    setsinglePostClicked(false);
  }

  const updateUserInfo = (username, email) => {
    updateUser(username, email);
  }

  const renderPage = () => {
    if (writeButtonClicked) {
      return <Write />
    } else if (homeButtonClicked) {
      return <Home OpenPost={OpenPost} />
    } else if (singlePostClicked) {
      console.log('single')
      return <SinglePost id={id} removePost={removePost} changePost={changePost} error={error}/>
    } else if (settingsButtonclicked) {
      return <Settings updateUserInfo={updateUserInfo}/>
    }
    else {
      return <Home OpenPost={OpenPost} />
    }
  }

  const renderLogin = () => {
    if (registerclicked) {
      return <Register registerUser={registerUser} loginclicked={loginclicked} error={error}/>
    } else {
      return <Login loginHandler={loginHandler} register={register} error={error}/>
    }
  }

  return (
    <div className="App">
      <Topbar Homeclicked={Homeclicked} WriteClicked={Writeclicked} Logoutclicked={Logoutclicked} settingclicked={settingclicked} />
      {(user.name !== '') ? (
        renderPage()
      ) : (
        renderLogin()
      )
      }
    </div>
  )
}

export default App;
