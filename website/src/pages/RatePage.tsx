
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
    <Rate3 bros={Bros}></Rate3>
  </div>
</>;};

const Rate3 : React.FC<{bros : Bro[]}> = ({bros})  => {
  const  [userName, setUserName] =  useState(String(ddd));
  const  [userRating, setUserRating] =  useState(Number(dddd));
  function sayHello2() {
    setUserName('jkjkjk')
  }
  function sayHello3() {
    setUserRating(8)
  }
  return (
    <div className="the-bros">
      <span className="cursor-pointer">
        <span>{userName}</span>
        <span className="">{userRating}</span>
        <input></input>
        </span>
      {
        bros.map(x => {
          return <span><span>{x.name}</span><span>{x.rating}</span></span>
        })
      }
    </div>
  )
}
