import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import { useA11yStore } from "../../../store/a11yStore";
import { Button } from "react-bootstrap";

const symbolsLimit = 25;
const Limiter = (x: string)
    : string => x.length > symbolsLimit ? `${x.slice(0, symbolsLimit)}...` : x;

const Header = () => {
    const toggleA11yPanel = useA11yStore(state => state.togglePanel);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to={routes[0].path}>
                        {routes[0].name}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            routes.slice(1).map(x =>
                                x.nested ?
                                    <NavDropdown key={x.path} title={Limiter(x.name)}>
                                        {
                                            x.nested.map(x2 =>
                                                <NavDropdown.Item as={Link} key={`${x2.path}${x2.name}`} to={`${x.path}${x2.path}`}>
                                                    {Limiter(x2.name)}
                                                </NavDropdown.Item>
                                            )
                                        }
                                    </NavDropdown>
                                    :
                                    x.component &&
                                    <Nav.Item key={`${x.path}${x.name}`}>
                                        <Link className="nav-link" to={x.path}>{Limiter(x.name)}</Link>
                                    </Nav.Item>
                            )
                        }
                    </Nav>
                    <Button 
                        variant="outline-light" 
                        onClick={toggleA11yPanel}
                        aria-label="Відкрити панель доступності"
                        className="ms-auto"
                    >
                        <i className="fa fa-eye me-2" aria-hidden="true"></i>
                        Доступність
                    </Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;