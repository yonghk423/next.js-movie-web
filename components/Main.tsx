// import Head from 'next/head'
// import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import styled from "styled-components";
import { useQuery } from 'react-query';
import { getMovies, IGetMoviesResult } from '../pages/api/api';
import { makeImagePath } from './Utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgphoto:string}>`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), 
  url(${(props) => props.bgphoto});
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
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 150px;
  font-size: 66px;
  cursor: pointer;
  
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const rowVariants = {
  hidden: {
    x: 1000,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -1000    
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration:0.1,
      type: "tween",
    }
  }
}

const offset = 6;

export default function Main() {  
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"],  getMovies )
  console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(0)
  const onBoxClicked = (movieId:number) => {
    setModalOpen(true)
    setModalData(movieId)
  }

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  
  return (   
    <>
      <Wrapper>
        {isLoading ? ( 
          <Loader>Loading...</Loader>
    ) : ( 
      <>
        <Banner 
          onClick={increaseIndex}
          bgphoto={makeImagePath(data?.results[2].backdrop_path || "")}
          >
          <Title>{data?.results[2].title}</Title>
          <Overview>{data?.results[2].overview}</Overview>
        </Banner>
        <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}                      
                    >    
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            { modalOpen ? (
              <>
                <Overlay/>
                <motion.div
                layoutId={modalData + ""}
                  style={{
                    position: "absolute",
                    width: "40vw",
                    height: "80vh",
                    backgroundColor: "green",
                    top: 50,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                  }}
                />
              </>
            ) : null}
          </AnimatePresence>          
      </>
      )}
      </Wrapper>
    </>
  )
}

