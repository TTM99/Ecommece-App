import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartScreen from "./Screens/CartScreen";
import Signin from "./Screens/Signin";
import ShippingAddress from "./Screens/ShippingAddress";
import Signup from "./Screens/Signup";
import PaymentMethod from "./Screens/PaymentMethod";
import PlaceOrder from "./Screens/PlaceOrder";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistory from "./Screens/OrderHistory";

const App = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart,
    user: { userInfo },
  } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              {/* link container allows to use react components in a bootstrap */}
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/paymentMethod" element={<PaymentMethod />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
