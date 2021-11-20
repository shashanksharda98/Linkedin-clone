import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import './App.css';
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';
import { loginState, logout, selectUser } from './features/userSlice';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';
import Widgets from './components/Widgets/Widgets';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth){
        dispatch(loginState({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }))
      }else{
        dispatch(logout());
      }
    })
  },[dispatch])
  

  
  return (
    <div className="app">

      <Header />

      {!user ? (<Login />) : (

        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}

    </div>
  );
}

export default App;
