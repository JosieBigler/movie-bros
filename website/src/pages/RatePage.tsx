
import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import apiService from "../data/ApiService";
import { RatingResponseDTO } from "../data/RatingApiResponseDTO";

let imagesPath: string[] = [
  'https://www.themoviedb.org/t/p/original/5C5oQtJ50Vg2qoVTp9XjNPyqZlq.jpg', 
  'https://www.themoviedb.org/t/p/original/tPu7eaHFcWCewPuL9ULMC9AoHPr.jpg'
];
let movieTitle = "Fortress";
let movieYear = "1992";
let movieDuration = "1h 35m";
let moviePicker = "Josie";


function MovieBackgroundImage() {
  const [aaa, aaaa] = useState(imagesPath[0])
  function sayHello() {
    aaaa(aaa === imagesPath[0] ? imagesPath[1] : imagesPath[0])
  }
  return (<img className="always-filled opacity-60" src={aaa} onClick={sayHello}/>)
  
}

export const RatingPage = () => {
  
  return <>
    <div className="relative">
      <MovieBackgroundImage></MovieBackgroundImage>
      <div className="pointer-events-none details">
        <div className="ttt1 relative">
          <h2 className="tracking-wide text-4xl font-semibold uppercase">{movieTitle}</h2>
          <p className="[&>*]:pr-4"><span>{movieYear}</span><span>{movieDuration}</span><span>{moviePicker}</span></p>
        </div>
      </div>
      <Ratings></Ratings>
    </div>
  </>;
};

const Ratings : React.FC = ()  => {

  
  const movieId = 'a660d18a-fc15-4de0-8ab9-9871f63506a8';
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [userName, setUserName ] = useState("");
  const  [userRating, setUserRating] =  useState(Number(1));
  const  [isRated, setisRated] =  useState(false);
  const  [ratings, setRatings] =  useState<RatingResponseDTO[]>();


  useEffect(() => {
    apiService.getIdentity();

    const fetchData = async () => {
      const identity = await apiService.getIdentity();
      const data = await apiService.getMovieRatings(movieId);
      setRatings(data.data);
      setisRated(data.haveRated); 
      setUserName(identity.data);
    }
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7097/hubs/rating")
      .withAutomaticReconnect()
      .build();
  
    fetchData().catch(console.error);
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            console.log('Message REceived from SignalR');
            //Set the rating from within here? 
            console.log(message);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async () => {
    console.log('clicked send message');
    let rating = await apiService.getMovieRatings('a660d18a-fc15-4de0-8ab9-9871f63506a8');
    console.log(rating);
  };
  
  return (
    <div className="the-bros">
      
    <button onClick={sendMessage}>Send Message</button>
      <span className="cursor-pointer">
        { isRated ? (
          <><span>{userName}: </span>
          <span>{userRating}</span></>
        ) : (
          <span>Click to rate</span>
        )}
      </span>
      { 
        ratings?.map(x => {
          return <span  key={x.userName}><span>{x.userName}: </span><span>{x.rating}</span></span>
        })
      }
    </div>
  )
}
