// ! Made By rishit khandelwal (github.com/rishit-khandelwal)
import styled from "styled-components";
import { motion } from "framer-motion";
import Accessibility from "./Accessibility";
import { language } from "@/state/atoms";
import { useRecoilState } from "recoil";
import React from "react";

const Layout = ({ body, media }) => {
  const [lang, setLang] = useRecoilState(language);

  return (
    <Container>
      <Accessibility
        text={lang ? "E N" : "H I"}
        onClick={() => {
          lang ? setLang(false) : setLang(true);
        }}
      />
      <Content>
        <Body>{body}</Body>
      </Content>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.5,
            opacity: 0,
            x: 200,
          },
          visible: {
            scale: 1,
            opacity: 1,
            x: 0,
            transition: {
              delay: 0.5,
            },
          },
        }}
      >
        <Media>{media}</Media>
      </motion.div>
      <Footer>Vividham Sanskritam</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 0 45px;

  align-items: center;
  justify-content: center;
  margin: 0;
  overflow: hidden;
  @media screen and (max-width: 640px) {
    padding: 0 15px;
    overflow: auto;
  }
`;
const Content = styled.div`
  position: relative;
  margin: 0px 8% 50px;
  padding: 0 5%;
  max-width: 600px;
`;
const Media = styled.div`
  flex-grow: 1;
  margin-left: 40px;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;
const Body = styled.div`
  display: block;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
`;
const Footer = styled.div`
  color: var(--primary-grey);
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: 0.8rem;
  text-transform: uppercase;
  position: absolute;
  width: 100%;
  bottom: 5%;
  opacity: 0.2;
  @media screen and (max-width: 640px) {
    font-size: 1rem;
    position: absolute;
    bottom: -9%;
  }
`;
export default Layout;
