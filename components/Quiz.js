// ! Made By rishit khandelwal (github.com/rishit-khandelwal)
import InfoBox from "@/components/InfoBox";
import Sparkles from "@/components/Sparkles/Sparkles";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useTimer } from "react-timer-hook";

import React, { useEffect, useMemo } from "react";
import { language, score as ScoreAtom } from "@/state/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import useSound from "use-sound";

function Timer({ seconds }) {
  return (
    <div>
      <TimerBlock>{seconds}</TimerBlock>
    </div>
  );
}

const Quiz = ({ stateName, questions }) => {
  const soundUrl = "/sounds/pfff.mp3";
  const [play, { stop }] = useSound(soundUrl, { volume: 0.5 });
  const router = useRouter();

  const [questionLevel, setQuestionLevel] = React.useState(0);
  const [score, setScore] = useRecoilState(ScoreAtom);
  const [didClick, setDidClick] = React.useState(false);

  const expiryTimestamp = useMemo(() => {
    const x = new Date();
    x.setSeconds(x.getSeconds() + 5);
    return x;
  }, [questionLevel]);

  const { seconds, restart, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => {},
  });

  useEffect(() => {
    if (isRunning) return;
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
    nextQuestion(questionLevel, { blur: () => {} });
    restart(time);
  }, [isRunning]);

  const lang = useRecoilValue(language);

  useEffect(() => {
    if (!localStorage.getItem("doneStates")) {
      localStorage.setItem("doneStates", "[]");
    }
    let doneStates = JSON.parse(localStorage.getItem("doneStates"));

    if (doneStates.includes(stateName)) {
      (() => router.push("/select"))();
    }
  }, []);

  const nextQuestion = (questionLevel, toBlur) => {
    restart();
    if (questionLevel > questions.length - 2) {
      let doneStates = JSON.parse(localStorage.getItem("doneStates"));
      localStorage.setItem(
        "doneStates",
        JSON.stringify([...doneStates, stateName])
      );

      return router.push("/score");
    }

    toBlur.blur();
    setDidClick(false);
    setQuestionLevel(questionLevel + 1);
  };

  const fadeIn = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
            x: -100,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              delay: 0.5,
            },
          },
        }}
      >
        <InfoBox
          title={
            questions[questionLevel].image
              ? questions[questionLevel].image
              : `${stateName} - ${questionLevel} out of ${questions.length}.`
          }
          isLink={questions[questionLevel].image}
        />
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Sparkles>
          <Title>
            {
              lang
                ? questions[questionLevel].prompt
                : questions[questionLevel].prompt_hindi ??
                  questions[questionLevel].prompt // if hindi prompt is not available
            }
          </Title>
        </Sparkles>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        {lang
          ? questions[questionLevel].options.map((question, index) => (
              <AnswerChoice
                key={index}
                isAnswer={index === questions[questionLevel].correct}
                onClick={(e) => {
                  if (didClick) return;
                  setDidClick(true);
                  if (index === questions[questionLevel].correct) {
                    play();
                  }
                  if (index === questions[questionLevel].correct) {
                    setScore(score + 1);
                  }
                  nextQuestion(questionLevel, e.target);
                }}
                onMouseLeave={() => {}}
              >
                {question}
              </AnswerChoice>
            ))
          : (
              questions[questionLevel].options_hindi ?? // if hindi options are not availble
              questions[questionLevel].options
            ).map((question, index, arr) => (
              <AnswerChoice
                key={index}
                isAnswer={index === questions[questionLevel].correct}
                onClick={(e) => {
                  if (didClick) return;
                  setDidClick(true);
                  if (index === questions[questionLevel].correct) {
                    play();
                  }
                  if (index === questions[questionLevel].correct) {
                    setScore(score + 1);
                  }
                  nextQuestion(questionLevel, e.target);
                }}
                onMouseLeave={() => {}}
              >
                {question}
              </AnswerChoice>
            ))}
      </motion.div>
    </div>
  );
};

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin: 20px 0px;
`;

const AnswerChoice = styled.button`
  font-weight: 800;
  display: inline-block;
  width: 100%;
  padding: 15px 80px;
  border-width: 0;
  font-size: 0.8rem;
  text-align: center;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  background: transparent;
  text-decoration: none;
  margin: 10px 0px;
  position: relative;
  border: 4px solid var(--primary);
  border-radius: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  z-index: 20;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: var(--primary);
    color: white;
  }
  &:focus {
    outline: none;
    box-shadow: none;
    background: ${(props) =>
      props.isAnswer ? "var(--success)" : "var(--danger)"};
    color: white;
    border: 4px solid
      ${(props) => (props.isAnswer ? "var(--success)" : "var(--danger)")};
  }
`;

const TimerBlock = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding: 20px 20px;
  margin: 0px 10px;
  background: #9796f0;
  color: white;
  background: var(--background-grey);
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

export default Quiz;
