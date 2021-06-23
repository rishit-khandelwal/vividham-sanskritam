// ! Made By rishit khandelwal (github.com/rishit-khandelwal)
import React from "react";
import styled from "styled-components";
import questions from "@/static/Questions.json";

const StateSelect = ({ value, handleChange }) => {
  const states = Object.keys(questions);
  states.sort();

  return (
    <Select value={value} onChange={handleChange}>
      <option defaultValue>Select State/UT</option>
      {states.map((state, _) => (
        <option key={_} value={state}>
          {state}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  font-weight: 800;
  display: inline-block;
  width: 100%;
  padding: 30px 150px;
  border-width: 0;
  font-size: 0.8rem;
  text-align: center;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  background: transparent;
  text-decoration: none;
  margin: 20px 0px;
  position: relative;
  border: 4px solid var(--primary);
  border-radius: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  z-index: 20;
  overflow: hidden;
  cursor: pointer;
`;

export default StateSelect;
