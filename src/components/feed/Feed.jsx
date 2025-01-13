import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './feed.css';
import moment from 'moment';

import { API_KEY, valueConvertor } from '../../data';
import thumbnail1 from '../../assets/thumbnail1.png'; 

export default function Feed({ smallSidebar, category }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    try {
      fetch(videoList_url)
      .then(res=>res.json())
      .then(data=>setData(data.items))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className={`container ${smallSidebar ? "" : 'large-Container'}`}>
      <div className="feed">
        {data.map((item, index) => {
          return (
            <Link to={`/videoPlayer/${item.snippet.categoryId}/${item.id}`} className="card" key={index}> 
              <img src={item.snippet.thumbnails.medium.url} alt="Video thumbnail" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>{valueConvertor(item.statistics.viewCount)} views • {moment(item.snippet.publishedAt).fromNow()}</p>

            </Link>
          );
        })}
      </div>
    </div>
  );
}
