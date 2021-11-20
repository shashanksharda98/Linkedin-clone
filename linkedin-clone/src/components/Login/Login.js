import React, {useState} from 'react';
import {useDispatch} from  'react-redux';
import { auth } from '../../firebase';
import "./Login.css";
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import { loginState } from "../../features/userSlice";

function Login() {

    const[username, setUsername] = useState('');
    const[profilePic, setProfilePic] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');
    const dispatch = useDispatch();

    const register = () => {
        if(!name) {
            return alert("Please enter a full name!");
        }

        createUserWithEmailAndPassword(auth, email, password).then( (userAuth) => {
            const user =  userAuth.user;
            updateProfile(user, {
                displayName: name,
                photoURL: profilePic,
            }).then(() => {
                dispatch(loginState({
                    email:user.email,
                    uid: user.uid,
                    displayName: name,
                    photoUrl: profilePic
                }))
            })
        }).catch(err => alert(err.message));

    };

    const login = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then(userAuth => {
            console.log(userAuth.user);
            dispatch(loginState({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL,
            }))
        }).catch(err => alert(err));
    }

    return (
        <div className="login">

            <img src="./logo/linkedin.png" alt="" />

            <form>

                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name (required if registering)" type="text" />

                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" type="text" />

                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" type="email" />

                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />

                <button type="submit" onClick={login}>Sign In</button>
            </form>

            <p>Not a member? {" "}
                <span className="login__register" onClick={register}>
                    Register Now
                </span>
            </p>

        </div>
    )
}

export default Login
