import React from 'react';
import "./Widgets.css";
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>

            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>

        </div>
    )
    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>
            {newsArticle("Naruto learns Sage Mode", "Top News - 5990 readers")}
            {newsArticle("Demon Slayer's next episode out now!!", "Top News - 4562 readers")}
            {newsArticle("Sasuke kills Orochimaru", "Konoha News - 568 readers")}
            {newsArticle("One Punch man next season coming soon??", "Anime News - 8970 readers")}
            {newsArticle("Spiderman - No way home trailer out now", "MCU updates - 129870 readers")}
            {newsArticle("React more easy than Angular", "Code - 777 readers")}
        </div>
    )
}

export default Widgets
