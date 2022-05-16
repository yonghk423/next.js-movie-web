import Link from 'next/link';
import styled from "styled-components";
import Image from 'next/image';

const NavBar = styled.nav`
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
  svg {
    height: 25px;
  }
`;

export default function Header() {
    return (    
      <NavBar>
        <Col>
          <Logo>
            <Image src="/yonghee.jpeg" alt="" layout='fill' />
          </Logo>
          <Items>
            <Item>
              <Link href={"/series"}>
                <a>series</a>
              </Link>
            </Item>
            <Item>
              <Link href={"/movies"}>
                <a>movies</a>
              </Link>
            </Item>
          </Items>
        </Col>
          <Search>
            <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
          </Search>
      </NavBar>      
    )
}