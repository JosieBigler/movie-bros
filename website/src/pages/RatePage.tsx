
import axios from "axios";
import { useState } from "react";

let imagesPath: string[] = [
  'https://www.themoviedb.org/t/p/original/5C5oQtJ50Vg2qoVTp9XjNPyqZlq.jpg', 
  'https://static.bunnycdn.ru/i/cache/images/d/d7/d7d38f0a99976c7f8baeb4a701977399.jpg'
];
let sss = "Fortress";
let ssss = "1992";
let sssss = "1h 35m";
let ssssss = "Josie";

let ddd = "Josie 10";
let dddd = "Shawn 8.8";
let ddddd = "Wesley 0.5";
let dddddd = "Jasper 5";

const testApiCall = () => {
  axios({
    method: 'get',
    url: 'https://localhost:7097/api/Movies',
    withCredentials: true
  }).then(promise => {
    console.log(promise);
  });
}

function Rate2() {
  testApiCall();
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
    <div className="the-bros"><span>{ddd}</span><span>{dddd}</span><span>{ddddd}</span><span>{dddddd}</span></div>
  </div>
</>;};