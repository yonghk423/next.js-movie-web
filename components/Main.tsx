import type { NextPage } from 'next'
import styled from "styled-components";
import Head from 'next/head'
import Link from 'next/link';
import { useQuery } from 'react-query';
import Header from './Header';
import { getMovies, IGetMoviesResult } from '../pages/api/api';
import { makeImagePath } from './Utils';

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

export default function Main() {
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"],  getMovies )
  console.log(data, isLoading);
  return (   
    <>
      <Wrapper>
        {isLoading ? ( 
          <Loader>Loading...</Loader>
    ) : ( 
      <>
        <Banner bgPhoto={makeImagePath(data?.results[3].backdrop_path || "")}>
          <Title>{data?.results[3].title}</Title>
          <Overview>{data?.results[3].overview}</Overview>
        </Banner>
      </>
      )}
      </Wrapper>
    </>
  )
}

