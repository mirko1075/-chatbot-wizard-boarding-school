import React, {useEffect, useState} from 'react';
import data from '../data/data.json';
import imageG from "../imgs/Gryffindor.png";
import imageH from "../imgs/Hufflepuff.png"
import imageR from "../imgs/Ravenclaw.png"
import imageS from "../imgs/Slytherin.png"
export default function ResultComponent(props) {
  const {steps} = props;
  const [assignedHouse, setAssignedHouse] = useState();
  const [housesAcc, setHousesAcc] = useState({
    houseG: 0,
    houseH: 0,
    houseR: 0,
    houseS: 0
  });
  const [image, setImage] = useState("");

  const calculateHouse = async ( steps ) => {
    let { houseG, houseH, houseR, houseS } = housesAcc;
    //Convert object into array
    const stepsArr = [];
    for (const property in steps){
      stepsArr.push(steps[property])
    }
    //Assign score for all the answers to the respective house
    stepsArr.forEach((step, i) => {
      if (i % 2 === 0) {
        const element = data.find(el => el.answers.find(answer => answer.title === step.message));
        if (element) {
          const answers = element.answers;
          const selectedAnswer = answers.find(el => el.title === step.message);
          const selectedAnswerScores = selectedAnswer.scores;
          const { g, h, r, s } = selectedAnswerScores;
          houseG += g;
          houseH += h;
          houseR += r;
          houseS += s;
        }
      }
    });
    const resultObj = [
      { house: 'Gryffindor', score: houseG },
      { house: 'Hufflepuff', score: houseH },
      { house: 'Ravenclaw', score: houseR },
      { house: 'Slytherin', score: houseS }
    ];
    let maxScore = 0;
    let houseKey = null;
    resultObj.forEach(el => {
      if (el.score > maxScore) {
        maxScore = el.score;
        houseKey = el.house;
      }
    });
    setAssignedHouse(houseKey);
  };


  useEffect(()=>{
    if (!assignedHouse) return;
    switch (assignedHouse){
      case "Gryffindor":
        setImage(imageG);
        break;
      case "Hufflepuff":
        setImage(imageH);
        break;
      case "Ravenclaw":
        setImage(imageR);
        break;
      case "Slytherin":
        setImage(imageS);
        break;
      default:
        break;
    }
  },[assignedHouse])

  useEffect(() => {
    calculateHouse(steps)
  }, []);
  

  return (
    <div className="headerBgColor">
      <span>The calculated house is: <h1>{assignedHouse}</h1></span>
      <div>
        <img src={image} alt={image} className="resultImage"  />
      </div>
    </div>
    )
}
