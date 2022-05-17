import Link from 'next/link';
import styled from "styled-components";
import Image from 'next/image';
import { motion } from "framer-motion";
import { useState } from "react";

const NavBar = styled.nav`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  position: relative;
  margin-right: 50px;
  width: 60px;
  height: 50px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

  const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -150px;
`;

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = () => setSearchOpen(true);
  const toggleSearch = () => setSearchOpen((prev) => !prev);
    return (    
      <NavBar>
        <Col>
          <Logo>
            <Image src="/yonghee.jpeg" alt="" layout='fill' />
          </Logo>
          <Items>
            <Item>
              <Link href={"/Series"}>
                <a>series</a>
              </Link>
            </Item>
            <Item>
              <Link href={"/Movies"}>
                <a>movies</a>
              </Link>
            </Item>
          </Items>
        </Col>
          <Search>
            <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input 
            transition={{ type: "linear" }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            placeholder="search..."/>
          </Search>
      </NavBar>      
    )
}
