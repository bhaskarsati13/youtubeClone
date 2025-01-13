import React, { useState, useEffect } from 'react';
import './recommended.css';
import { API_KEY } from '../../data';
import { valueConvertor } from '../../data';

export default function Recommended({ categoryId }) {
  const [recommendedVideo, setRecommendedVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    const recommendedUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

    fetch(recommendedUrl)
      .then((res) => res.json())
      .then((data) => {
        setRecommendedVideo(data.items);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchData(); 
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="recommended">
      {recommendedVideo && recommendedVideo.length > 0 ? (
        recommendedVideo.map((item, index) => (
          <div key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{valueConvertor(item.statistics.viewCount)} views</p>
            </div>
          </div>
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
}
