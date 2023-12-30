
import axios from "axios";
import { useState } from "react";

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

const testRate = () => {
  axios({
    method: 'POST',
    url: 'https://localhost:7097/api/Ratings',
    withCredentials: true,
    data: {
      movieId: 'a660d18a-fc15-4de0-8ab9-9871f63506a8',
      rating: 1.2,
    }
  }).then(promise => {
    // console.log(promise);
  });
}

const testApiCall = () => {
  axios({
    method: 'get',
    url: 'https://localhost:7097/api/Movies',
    withCredentials: true
  }).then(promise => {
    // console.log(promise);
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
      <div className="ttt1 relative">
        <h2 className="tracking-wide text-4xl font-semibold uppercase">{sss}</h2>
        <p className="[&>*]:pr-4"><span>{ssss}</span><span>{sssss}</span><span>{ssssss}</span></p>
      </div>
    </div>
    <Rate3 brosParam={Bros}></Rate3>
  </div>
</>;};

const Rate3 : React.FC<{brosParam : Bro[]}> = ({brosParam})  => {
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
    <div className="the-bros">
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
          return <span  key={aaaa++}><span>{x.name}</span><span>{x.rating}</span></span>
        })
      }
    </div>
  )
}
