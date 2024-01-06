
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from "react";
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

interface ratingProps {
  movieId : string
}

function MovieBackgroundImage() {
  const [aaa, aaaa] = useState(imagesPath[0])
  function sayHello() {
    aaaa(aaa === imagesPath[0] ? imagesPath[1] : imagesPath[0])
  }

  const myStyle = {
    backgroundImage: "url('https://www.themoviedb.org/t/p/original/5C5oQtJ50Vg2qoVTp9XjNPyqZlq.jpg')"
  }
  return (<img style={myStyle} src={aaa} onClick={sayHello}/>)
  
}

// order of operation: 
// 1: get the ratings for the current movie. 
// 2: Check to see if current logged in user has rated. 
// 3: If yes, don't do shit. 
// 4: if No, hide the ratings until user rates.
// 5: When user rates -> send to DB -> send to hub -> update internal state of Rating.

export const RatingPage = ({movieId} : ratingProps) => {

  
  return <>
    <div className="relative">
      <div className="pointer-events-none details">
        <div className="ttt1 relative">
          <h2 className="tracking-wide text-4xl font-semibold uppercase">{movieTitle}</h2>
          <p className="[&>*]:pr-4"><span>{movieYear}</span><span>{movieDuration}</span><span>{moviePicker}</span></p>
        </div>
      </div>
      <Ratings movieId={movieId}></Ratings>
    </div>
  </>;
};

const Ratings  = ({movieId} : ratingProps)  => {

  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [userName, setUserName ] = useState("");
  const [ratings, setRatings] =  useState<RatingResponseDTO[]>([]);
  const [haveRated, setHaveRated] = useState(false);
  const [rating, setRating] = useState(0);
  const avgUser:RatingResponseDTO = { userName: "Average", rating: -1, movieId}

  useEffect(() => {
    apiService.getIdentity();

    const fetchData = async () => {
      console.log(movieId);

      const identity = await apiService.getIdentity();
      const data = await apiService.getMovieRatings(movieId);
      setRatings([avgUser, ...data.data]);
      SetTheAverageRatingOfRatings([avgUser, ...data.data]); // I don't know what JavaScript is doing but it works
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

  const rateMovie = async () => {

    //update internal state. 
    const rate = { userName, rating, movieId}
    SetTheAverageRatingOfRatings([...ratings, rate]); // I don't know what JavaScript is doing but it works
    setRatings(prevState => [...prevState, rate]);
    setHaveRated(true);
    
    //send to database.
    apiService.rateMovie(movieId, rate.rating);

    //send to Hub. 
    connection?.send("ReceiveMessage", rate);
  }

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value as number);
  }
  return (
    <div className="the-bros">
      {haveRated ? 
        <div>
        {
          ratings?.map(x => {
            // return <span  key={x.userName}><span>{x.userName}: </span><span>{x.rating}</span></span>
            return <RateBubble key={x.userName} DisplayName={x.userName} RatingValue={x.rating}></RateBubble>
          })
        }
        </div> 
        :
        <div>
          <input className="text-black" value={rating} type="number" onChange={handleChange}/>
          <button onClick={rateMovie} >Submit</button>
        </div>
      }
    </div>
  )
}
const RateBubble : React.FC<{DisplayName : string, RatingValue : number}> = ({DisplayName, RatingValue})  => {
  return (
    <div className="w-96 flex">
      <div className="text-left">
        {/* <span className="user-initials">{Array.from(DisplayName)[0]}{Array.from(DisplayName)[1]}</span> */}
        <span className="tracking-wider text-fortress-grey text-sm font-semibold">{DisplayName}'s Rating:
        </span>
        {/* <span className="text-white text-right"> {RatingValue}</span> */}
      </div>
      <div className="flex-1 text-right">
        <span className="text-white text-right"> {RatingValue}</span>
      </div>
    </div>
  )
}
function SetTheAverageRatingOfRatings(TheArrayWeWillBeUsingToMakeTheAverage:RatingResponseDTO[]) {
  let returnArr:RatingResponseDTO[] = TheArrayWeWillBeUsingToMakeTheAverage;
  let newRate = 0;
  for (let i = 1; i < returnArr.length; i++) {
    newRate += returnArr[i].rating; 
  }
  returnArr[0].rating = newRate/(returnArr.length - 1);
  return returnArr
}
