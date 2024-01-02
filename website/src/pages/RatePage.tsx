
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

let imagesPath: string[] = [
  'https://www.themoviedb.org/t/p/original/5C5oQtJ50Vg2qoVTp9XjNPyqZlq.jpg', 
  'https://www.themoviedb.org/t/p/original/tPu7eaHFcWCewPuL9ULMC9AoHPr.jpg'
];
let sss = "Fortress";
let ssss = "1992";
let sssss = "1h 35m";
let ssssss = "Josie";

const ddd: string = 'User Name';
let dddd: number = 0;

interface Bro{
  name: string,
  rating: number
}
const Bros : Bro[] = [
  {
    name: "Jasper",
    rating: 5.5
  },
  {
    name: "Josie",
    rating: 10
  },
]



const testRate = async () => {
  let result = await axios({
    method: 'POST',
    url: 'https://localhost:7097/api/Ratings',
    withCredentials: true,
    data: {
      movieId: 'a660d18a-fc15-4de0-8ab9-9871f63506a8',
      value: 1.2,
    }
  });
}

const testRate2 = async () => {
  //let result2 = await axios.get('https://localhost:7097/api/Ratings/a660d18a-fc15-4de0-8ab9-9871f63506a8', { withCredentials: true });
  // let result = await axios({
  //   method: 'GET',
  //   url: 'https://localhost:7097/api/Ratings/a660d18a-fc15-4de0-8ab9-9871f63506a8',
  //   withCredentials: true,
  //   withXSRFToken: true
  // });

  let response = await fetch('https://localhost:7097/api/Ratings/a660d18a-fc15-4de0-8ab9-9871f63506a8', {
    method: 'GET',
    credentials: 'include'
  });
  let payload = response.json();
  console.log(payload);
  //console.log(result2);
}

const testApiCall = async () => {
  let result = axios({
    method: 'get',
    url: 'https://localhost:7097/api/Movies',
    withCredentials: true
  });
}

function Rate2() {
  testApiCall();
  testRate();
  const [aaa, aaaa] = useState(imagesPath[0])
  function sayHello() {
    aaaa(aaa === imagesPath[0] ? imagesPath[1] : imagesPath[0])
  }
  return (<img className="always-filled opacity-60" src={aaa} onClick={sayHello}/>)
  
}
export const Rate = () => {
  

  // console.log(user);
return <>
  <div className="relative">
    <Rate2></Rate2>
    {/* <img className="always-filled opacity-60" src={jjj} onClick={sayHello}/> */}
    {/* <div className="up-shadow"></div> */}
    <div className="pointer-events-none details">
      <div className="details-bg relative">
        <h2 className="tracking-wide text-4xl font-semibold uppercase">{sss}</h2>
        <p className="[&>*]:pr-4 text-fortress-grey"><span>{ssss}</span><span>{sssss}</span><span>{ssssss}</span></p>
      </div>
    </div>
    <Rate3 brosParam={Bros}></Rate3>
  </div>
</>;};

const Rate3 : React.FC<{brosParam : Bro[]}> = ({brosParam})  => {
  const [connection, setConnection] = useState<null | HubConnection>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7097/hubs/rating")
      .withAutomaticReconnect()
      .build();
  
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
    await testRate2();
    // if (connection) await connection.send("SendMessage", { movieId: 'a660d18a-fc15-4de0-8ab9-9871f63506a8', value: 5.5 });
  };
  const  userName = ddd;
  let  aaaa = 0;
  const  [userRating, setUserRating] =  useState(Number(dddd));
  const  [isRated, setisRated] =  useState(dddd === 0 ? false : true);
  function sayHello3() {
    setUserRating(8);
    setisRated(true);
  }
  const  [bros, setbros] =  useState(brosParam);
  function sayHello2() {
    setbros([ ...bros, {name: "New", rating: 10 } ]);
  }
  return (
    <div className="the-bros container">
      <button onClick={sendMessage}>Send Message</button>
      <RateBubble DisplayName={userName} RatingValue={userRating}></RateBubble>
      <span className="cursor-pointer" onClick={sayHello3}>
        { isRated ? (
          <><span>{userName}</span>
          <span>{userRating}</span></>
        ) : (
          <span>Click to rate</span>
        )}
      </span>
      <span className="cursor-pointer" onClick={sayHello2}>Add Bro</span>
      { 
        bros.map(x => {
          // return <span  key={aaaa++}><span>{x.name}</span><span>{x.rating}</span></span>
          return <RateBubble  key={aaaa++} DisplayName={x.name} RatingValue={x.rating}></RateBubble>
        })
      }
    </div>
  )
}
const RateBubble : React.FC<{DisplayName : string, RatingValue : number}> = ({DisplayName, RatingValue})  => {
  return (
    <span className="">
      <div className="flex items-center">
        <span className="user-initials">{Array.from(DisplayName)[0]}{Array.from(DisplayName)[1]}</span>
        <span className="grow ml-2">
          <div className="tracking-wider text-fortress-grey text-sm font-semibold">{DisplayName}'s Rating</div>
          <div className="text-white">{RatingValue}<span className="text-fortress-grey text-xs">/10</span></div>
        </span>
      </div>
    </span>
  )
}