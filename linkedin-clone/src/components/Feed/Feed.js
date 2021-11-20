import React, {useState, useEffect} from 'react';
import "./Feed.css";
import FlipMove from 'react-flip-move';
import CreateIcon from '@mui/icons-material/Create';
import InputOption from "../InputOption/InputOption";
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from '../Post/Post';
import { db } from '../../firebase';
import {collection, onSnapshot, query, orderBy, addDoc, serverTimestamp} from "firebase/firestore";
import { selectUser } from '../../features/userSlice';
import {useSelector} from 'react-redux';

function Feed() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return onSnapshot( query(collection(db, "posts"), orderBy('timestamp', 'desc')), (snapshot) => (
            setPosts(
                snapshot.docs.map( (doc) => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                ))
            )
        ) )
    }, [])

    const sendPost = async (e) => {
        if(loading) return;
        setLoading(true);

        e.preventDefault();
        await addDoc(collection(db, "posts"), {
            name: user.displayName,
            description: "This is a description",
            message: input,
            photoUrl: "",
            userImg: !user.photoUrl? "" : user.photoUrl,
            timestamp: serverTimestamp()
        })
        setInput('');
        setLoading(false)
    }

    return (
        <div className="feed">
            
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write Article" color="#7FC15E" />
                </div>
            </div>

            <FlipMove>

                {
                    posts.map( (post) => (
                        <Post
                            key={post.id}
                            name={post.data.name}
                            description={post.data.description}
                            message={post.data.message}
                         />
                    ))
                }
            </FlipMove>


            {/* <Post name="Shashank Sharda" description="TEST0.0" message="Testing this component"/> */}
        
        </div>
    )
}

export default Feed
