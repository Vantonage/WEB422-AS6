import { useRouter } from 'next/router'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from '../lib/authenticate';

export default function MainNav() {

  let token = readToken();
  const [isActiveFavourite, setActiveFavourite] = useState(false);
  const [isActiveHistory, setActiveHistory] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter()
  // const query = '/artwork?title=true&q=' + search;
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(e) {
    e.preventDefault();
    let queryString = `title=true&q=${search}`;
    setSearchHistory(await addToHistory(`title=true&q=${search}`));
    router.push(`/artwork?title=true&q=${search}`);
    setActiveFavourite(false);
    setActiveHistory(false);
    setExpanded(false);
    setSearch('');

  }

  function logout() {
    setExpanded(false);
    removeToken();
    router.push('/');
  }


  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" expanded={isExpanded} className="fixed-top navbar-dark bg-primary navbar navbar-expand-lg navbar-light" >

        <Container fluid>
          <Navbar.Brand>Ricky Chen</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" type="button" onClick={() => setExpanded(!isExpanded)} />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} href="/" active={router.pathname === "/" } onClick={() => { setActiveFavourite(false); setActiveHistory(false); setExpanded(false) }}>Home</Nav.Link>

              {token && (
                <Nav.Link as={Link} href="/search" active={router.pathname === "/search"} onClick={() => { setActiveFavourite(false); setActiveHistory(false); setExpanded(false)  }}>Advanced Search</Nav.Link>

              )}



            </Nav>

            {token && (
              <>
                <Form className="d-flex" onSubmit={submitForm}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button type="submit" variant="success">Search</Button>
                </Form>
                <Nav>

                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" className="dropdown-item" ><NavDropdown.Item href="/favourites" active={isActiveFavourite} onClick={() => { setExpanded(false); setActiveFavourite(true); setActiveHistory(false) }}>
                      Favourites</NavDropdown.Item></Link>
                    <Link href="/history" className="dropdown-item"><NavDropdown.Item href="/history" active={isActiveHistory} onClick={() => { setExpanded(false); setActiveFavourite(false); setActiveHistory(true) }}>Search History</NavDropdown.Item></Link>
                    <Link href="#" className="dropdown-item"><NavDropdown.Item onClick={() => { setExpanded(false); setActiveFavourite(false); setActiveHistory(false); logout() }}>Logout</NavDropdown.Item></Link>
                  
                  </NavDropdown>
                </Nav>
              </>
            )}

            {!token && (
              <>
                <Nav>
                  <Nav.Link as={Link} href="/register" active={router.pathname === "/register"}>Register</Nav.Link>
                  <Nav.Link as={Link} href="/login" active={router.pathname === "/login"}>Login</Nav.Link>
                </Nav>
              </>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}