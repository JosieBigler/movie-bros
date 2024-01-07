
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from "react";
import apiService from "../data/ApiService";
import { RatingApiResponseDTO, RatingResponseDTO } from "../data/RatingApiResponseDTO";
import HubConnector from "../data/HubConnector";

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

  const [userName, setUserName ] = useState("");
  const [ratings, setRatings] =  useState<RatingResponseDTO[]>([]);
  const [haveRated, setHaveRated] = useState(false);
  const [rating, setRating] = useState(0);
  const [avgUser, setAvgUser] = useState<RatingResponseDTO>({ userName: "Average", rating: -1, movieId});
  const { newMessage, events } = HubConnector();

  useEffect(() => {
    //on first page load, do the stuff
    apiService.getIdentity();

    
    const fetchData = async () => {
      console.log(movieId);

      const identity = await apiService.getIdentity();
      const data = await apiService.getMovieRatings(movieId);
      setRatings([...data.data]);
      setAverage();
      //SetTheAverageRatingOfRatings([avgUser, ...data.data]); // I don't know what JavaScript is doing but it works
      setHaveRated(data.haveRated); 
      setUserName(identity.data);
      
    }

    fetchData().catch(console.error);
    
    events((movieId, userName, rating) => {
      let alreadyRated = ratings.find(x => x.movieId == movieId && x.userName == userName);
      if(alreadyRated) return; 

      setRatings(prevState => [...prevState, {movieId, userName, rating }]);
    });


  }, []);


  const rateMovie = async () => {

    //update internal state. 
    const rate = { userName, rating, movieId}
    //setRatings(prevState => [...prevState, rate]);
    //const newAverage = SetTheAverageRatingOfRatings(ratings); // I don't know what JavaScript is doing but it works
    //setAvgUser({ userName: 'Average', rating: newAverage, movieId});
    //setAverage();
    
    //send to database.
    apiService.rateMovie(movieId, rate.rating);
    
    //send to Hub. 
    newMessage(rate);

    setHaveRated(true);

  }

  const setAverage = () => {
    let average = 0;
    ratings.forEach(x => {
      if(x.userName != "Average"){
        console.log(x);
        average += x.rating;
      }
    });

    average = (average / (ratings.length - 1));

    setAvgUser({ userName: 'Average', rating: average, movieId});
  }

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
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

// function SetTheAverageRatingOfRatings(TheArrayWeWillBeUsingToMakeTheAverage:RatingResponseDTO[]) : number {
//   let returnArr:RatingResponseDTO[] = TheArrayWeWillBeUsingToMakeTheAverage;
//   let newRate = 0;
//   for (let i = 1; i < returnArr.length; i++) {
//     newRate += returnArr[i].rating; 
//   }
//   return newRate/(returnArr.length - 1);
// }
