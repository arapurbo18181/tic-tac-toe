import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [ToggleTurn, setToggleTurn] = useState(true);
  const [Won, setWon] = useState("");
  const [Winner, setWinner] = useState(false);
  const [Highlights, setHighlights] = useState([])
  const [BoardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  const updateBoardData = (idx) => {
    if (!BoardData[idx]) {
      let value = ToggleTurn === true ? "X" : "0";
      setBoardData({ ...BoardData, [idx]: value });
      setToggleTurn(!ToggleTurn);
    }
  };
  const winnerCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
  ];
  const checkWinner = () => {
    winnerCombo.map((elem) => {
      const [a, b, c] = elem;
      if (BoardData[a] != "") {
        if (BoardData[a] === BoardData[b] && BoardData[b] === BoardData[c]) {
          BoardData[a] === "X"
            ? setWon("X Won The Game")
            : setWon("0 Won The Game");
          setWinner(true);
          setHighlights([a,b,c]);
          return;
        }
      }
    });
  };
  useEffect(() => {
    checkWinner();
  }, [BoardData]);
  const reset = () => {
    setWinner(false);
    setToggleTurn(true)
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    })
    setHighlights([])
  }

  return (
    <div className="">
      <div className="flex justify-center text-5xl mt-5 font-bold">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="flex items-center flex-col mt-2">
        <div>{ToggleTurn === true ? "X-Turn" : "0-Turn"}</div>
        <div>{Winner === true ? <div className="text-center">{Won}  </div> : ""}</div>
        <div><button onClick={reset} className="border py-2 px-4 bg-gray-600 text-white rounded mt-2 hover:bg-gray-800">Reset game</button></div>
        <div className="grid grid-cols-3 gap-5 my-4">
          {[...Array(9)].map((elem, idx) => {
            return (
              <div
                onClick={() => updateBoardData(idx)}
                key={idx}
                className={`px-10 py-10 rounded shadow-gray-500 shadow-md hover:shadow-inner cursor-pointer text-8xl w-24 h-24 md:w-40 md:h-40 flex justify-center items-center ${Highlights.includes(idx)? "bg-teal-200":"bg-blue-100"}`}
              >
                {BoardData[idx]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
