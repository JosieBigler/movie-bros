
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

let ddd = "User name";
let dddd = "User rating";

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
  return <img className="always-filled opacity-60" src={aaa} onClick={sayHello}/>
  
}
export const Rate = () => {
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
  return (
    <div className="the-bros">
      <span><span>{ddd}</span><span>{dddd}</span></span>
      {
        bros.map(x => {
          return <span><span>{x.name}</span><span>{x.rating}</span></span>
        })
      }
    </div>
  )
}
