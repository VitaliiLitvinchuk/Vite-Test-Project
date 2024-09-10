import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IRouteEndpoint, routes } from "../../../routes";

const NavDropdownItemCreator = (route: IRouteEndpoint) => {
    return (
        <NavDropdown.Item>
            <Link className="nav-link" to={route.path}>{route.name}</Link>
        </NavDropdown.Item>
    )
}

const Header = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand><Link className="navbar-brand" to={routes[0].path}>{routes[0].name}</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            routes.slice(1).map(x =>
                                x.nested ?
                                    <NavDropdown title={x.name}>
                                        {
                                            x.nested.map(x2 => {
                                                x2.path = `${x.path}${x2.path}`;
                                                return NavDropdownItemCreator(x2);
                                            })
                                        }
                                    </NavDropdown>
                                    :
                                    <Nav.Item>
                                        <Link className="nav-link" to={x.path}>{x.name}</Link>
                                    </Nav.Item>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;