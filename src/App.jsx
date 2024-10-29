import { useEffect, useState } from "react";
import './style.css'

function App(){
  const [results,setResults]=useState([]);
  const [clickedPoke,setClickedPoke]=useState([]);
  const [score,setScore]=useState(0);
  const [bestScore,setBestScore]=useState(0);
  const pokemon=["pikachu","squirtle","bulbasaur","ditto","charizard","arceus","meowth","butterfree","mewtwo","mew"];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function cardClick(name){
    setResults(results=>shuffleArray(results));
    if(clickedPoke.includes(name)){
      if(score>bestScore){
        setBestScore(score);
      }
      setScore(0);
      setClickedPoke([]);
    }
    else{
      setClickedPoke([...clickedPoke,name]);
      setScore(score=>score+1);
    }
  }

  useEffect(()=>{
    shuffleArray(pokemon);
    Promise.all(pokemon.map(poke=>fetch(`https://pokeapi.co/api/v2/pokemon/${poke}/`)))
    .then(responses=>Promise.all(responses.map(res=>res.json())))
    .then(data=>setResults(data))
    .catch(error=>console.log(error));
  },[])

  return(
    <div>
      <div className="head">
        <p id="title">Memory Card Game</p>
        <div className="score">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
      <ul>
      {results.length==10?results.map((result,index)=>(
        <li key={index} onClick={()=>cardClick(result.species.name)}>
          <img src={result.sprites.other.dream_world.front_default} alt="pokemon"/>
          <p id="name">{result.species.name}</p>
        </li>
      )):<h1>Loading..</h1>}
      </ul>
    </div>
  )
}

export default App;