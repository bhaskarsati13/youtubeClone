import React, { useState, useEffect } from 'react';
import video1 from '../../assets/video.mp4';
import './playVideo.css';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY } from '../../data';
import { valueConvertor } from '../../data';
import moment from 'moment';

export default function PlayVideo({ videoId }) {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Fetch video data
  const fetchVideoData = () => {
    const videoDetails_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    try {
      fetch(videoDetails_Url)
        .then((res) => res.json())
        .then((data) => setApiData(data.items[0]));
    } catch (error) {
      console.error('Error fetching apiData:', error);
    }
  };

  // Fetch channel data
  const fetchChannelData = () => {
    if (!apiData) return;

    const channelDetails_Url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    try {
      fetch(channelDetails_Url)
        .then((res) => res.json())
        .then((data) => setChannelData(data.items[0]));
    } catch (error) {
      console.error('Error fetching channelDetails:', error);
    }

    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`;
    try {
      fetch(commentUrl)
        .then((res) => res.json())
        .then((data) => setCommentData(data.items));
    } catch (error) {
      console.error('Error fetching commentUrl:', error);
    }
  };

  // UseEffect hooks
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);

  return (
    <div className="play-video-page">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          title="YouTube video"
        ></iframe>

        <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>
        <div className="video-info">
          <p>
            {apiData ? valueConvertor(apiData.statistics.viewCount) : '16k'} views •{' '}
            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
          </p>
          <div className="video-actions">
            <span>
              <img src={like} alt="like" />{' '}
              {apiData ? valueConvertor(apiData.statistics.likeCount) : 155}
            </span>
            <span>
              <img src={dislike} alt="dislike" /> Dislike
            </span>
            <span>
              <img src={share} alt="share" /> Share
            </span>
            <span>
              <img src={save} alt="save" /> Save
            </span>
          </div>
        </div>
        <hr />
      </div>

      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="publisher" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span>
            {channelData ? valueConvertor(channelData.statistics.subscriberCount) : '1M'} subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description'}</p>
        <hr />
        <h4>{apiData ? valueConvertor(apiData.statistics.commentCount) : 102} Comments</h4>

        {/* comment section */}
        {commentData.map((item, index) => {
          if (item.snippet && item.snippet.topLevelComment) {
            return (
              <div className="comment" key={index}>
                <img
                  src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                  alt="user profile"
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}{' '}
                    <span>
                      {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                    </span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="like" />
                    <span>{valueConvertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike} alt="dislike" />
                    <span>2</span>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
