// import Head from 'next/head'
// import Link from 'next/link';
import dynamic from 'next/dynamic'
import styled from "styled-components";
import { useQuery } from 'react-query';
import { getMovies, IGetMoviesResult } from '../pages/api/api';
import { makeImagePath } from './Utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Banner = styled.div<{bgPhoto:string}>`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;  
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;


const rowVariants = {
  hidden: {
    x: 1000
  }, 
  visible: {
    x: 0,
  },
  exit: {
    x: -1000,
  },
};

export default function Main() {
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"],  getMovies )
  console.log(data, isLoading);

  const [index, setIndex] = useState(0)
  const increaseIndex = () => setIndex((prev) => prev + 1);
  return (   
    <>
      <Wrapper>
        {isLoading ? ( 
          <Loader>Loading...</Loader>
    ) : ( 
      <>
        <Banner bgPhoto={makeImagePath(data?.results[2].backdrop_path || "")}>
          <Title>{data?.results[2].title}</Title>
          <Overview>{data?.results[2].overview}</Overview>
        </Banner>
        <Slider>
            <AnimatePresence>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box key={i}>{i}</Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
      </>
      )}
      </Wrapper>
    </>
  )
}

