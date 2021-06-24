// ! Made By rishit khandelwal (github.com/rishit-khandelwal)
import React from "react";
import styled, { keyframes } from "styled-components";
import questions from "@/static/Questions.json";
import { useRecoilState } from "recoil";
import { language } from "@/state/atoms";

const StateSelect = ({ value, handleChange }) => {
  const [lang, _] = useRecoilState(language);
  const states = Object.keys(questions);
  states.sort();

  return (
    <Select value={value} onChange={handleChange}>
      <Option defaultValue>
        {lang ? "Select State/UT" : "अपने राज्य का चुनाव करे"}
      </Option>
      {states.map((state, _) => (
        <Option key={_} value={state}>
          {state}
        </Option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  font-weight: 800;
  display: inline-block;
  width: 100%;

  text-align: center;

  padding: 30px 150px;
  border-width: 0;
  font-size: 1rem;

  text-align: center;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: transparent;
  text-decoration: none;
  margin: 20px 0px;
  position: relative;
  border: 4px solid var(--primary);
  border-radius: 25px;

  cursor: pointer;
`;

const Option = styled.option`
  font-size: 1rem;

  font-family: "Metropolis";

  background: var(--primary);
  color: #fff;
`;

export default StateSelect;
