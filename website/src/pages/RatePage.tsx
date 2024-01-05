
import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import apiService from "../data/ApiService";
import { RatingResponseDTO } from "../data/RatingApiResponseDTO";

const imagesPath: string[] = [
  'https://www.themoviedb.org/t/p/original/5C5oQtJ50Vg2qoVTp9XjNPyqZlq.jpg', 
  'https://www.themoviedb.org/t/p/original/tPu7eaHFcWCewPuL9ULMC9AoHPr.jpg'
];
const movieTitle = "Fortress";
const movieYear = "1992";
const movieDuration = "1h 35m";
const moviePicker = "Josie";


function MovieBackgroundImage() {
  const [aaa, aaaa] = useState(imagesPath[0])
  function sayHello() {
    aaaa(aaa === imagesPath[0] ? imagesPath[1] : imagesPath[0])
  }
  return (<img className="always-filled opacity-60" src={aaa} onClick={sayHello}/>)
  
}

// order of operation: 
// 1: get the ratings for the current movie. 
// 2: Check to see if current logged in user has rated. 
// 3: If yes, don't do shit. 
// 4: if No, hide the ratings until user rates.
// 5: When user rates -> send to DB -> send to hub -> update internal state of Rating.

export const RatingPage = (props :string) => {

  
  return <>
    <div className="relative">
      <MovieBackgroundImage></MovieBackgroundImage>
      <div className="pointer-events-none details">
        <div className="ttt1 relative">
          <h2 className="tracking-wide text-4xl font-semibold uppercase">{movieTitle}</h2>
          <p className="[&>*]:pr-4"><span>{movieYear}</span><span>{movieDuration}</span><span>{moviePicker}</span></p>
        </div>
      </div>
      <Ratings movieId={props}></Ratings>
    </div>
  </>;
};

const Ratings : React.FC<{ movieId : string}> = (props)  => {

  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [userName, setUserName ] = useState("");
  const  [ratings, setRatings] =  useState<RatingResponseDTO[]>([]);
  const [haveRated, setHaveRated] = useState(false);


  useEffect(() => {
    apiService.getIdentity();

    const fetchData = async () => {
      const identity = await apiService.getIdentity();
      const data = await apiService.getMovieRatings(props.movieId);
      setRatings(data.data);
      setHaveRated(data.haveRated); 
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

  const rateMovie = async (rate : RatingResponseDTO) => {

    //update internal state. 
    setRatings(prevState => [...prevState, rate]);
    setHaveRated(true);
    
    //send to database.
    apiService.rateMovie(props.movieId, rate.rating);

    //send to Hub. 
    connection.send("ReceiveMessage", rate);
  }

  const sendMessage = async () => {
    console.log('clicked send message');
    let rating = await apiService.getMovieRatings('a660d18a-fc15-4de0-8ab9-9871f63506a8');
    console.log(rating);
  };
  
  return (
    <div className="the-bros">
      {haveRated ? 
        <div>
        {
          ratings?.map(x => {
            return <span  key={x.userName}><span>{x.userName}: </span><span>{x.rating}</span></span>
          })
        }
        </div> 
        :
        <div>
          You have not rated, you can not see the ratings.
        </div>
      }
      
    </div>
      
  )
}
