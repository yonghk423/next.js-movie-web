import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useQuery } from 'react-query';
import Header from '../components/Header';
import { getMovies, IGetMoviesResult } from './api/api';

const Home: NextPage = () => {
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"],  getMovies )
  console.log(data, isLoading);
  return (   
    <>
      <Header/>
    </>
  )
}

export default Home
