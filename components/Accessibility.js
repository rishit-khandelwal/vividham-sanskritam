// ! Made By rishit khandelwal (github.com/rishit-khandelwal)
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { language } from "@/state/atoms";

const Icon = ({ text, ...delegated }) => {
  return <IconWrapper {...delegated}>{text}</IconWrapper>;
};

const Accessibility = ({ text, ...delegated }) => {
  const [lang, setLang] = useRecoilState(language);
  return (
    <>
      <Link href="/">
        <FlagIcon src="/flag.png" />
      </Link>
      <MainWrapper>
        <Icon text={text} {...delegated} />
      </MainWrapper>
      <MainWrapper
        style={{
          right: "140px",
        }}
      >
        <Icon
          text={lang ? "Travelled Locations" : "यात्रानुभवी स्थान"}
          {...delegated}
          onClick={() => {
            window.location.href = "/travelled";
          }}
        />
      </MainWrapper>
      <MainWrapper
        style={{
          right: lang ? "340px" : "300px",
        }}
      >
        <Icon
          text={lang ? "Instructions" : "अनुदेश"}
          {...delegated}
          onClick={() => {
            window.location.href = "/instructions";
          }}
        />
      </MainWrapper>
    </>
  );
};

const IconWrapper = styled.div`
  padding: 20px 20px;
  background: #9796f0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    var(--primary),
    var(--primary-gradient-2)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    var(--primary),
    var(--primary-gradient-2)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
`;

const FlagIcon = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50px;
  left: 80px;
  cursor: pointer;
`;

export default Accessibility;
