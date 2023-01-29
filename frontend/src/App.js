import "./App.css";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home/Home";

import { Navigation } from "./component/shared/Navigation/Navigation";

// import Register from "./pages/Register/Register";
// import Login from "./pages/Login/Login";

import Authenticate from "./pages/Authenticate/Authenticate";

// import { children } from "react";

import Activate from "./pages/Activate/Activate";

import Rooms from "./pages/Rooms/Rooms";

import Room from "./pages/Room/Room";

import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import { Loader } from "./component/shared/Loader/Loader";

function App() {
  // Call refresh end point

  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
    // <div  className='App'>

    //   this is our project........
    // </div>

    <BrowserRouter>
      <Navigation />

      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>

        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>

        <SemiProtectedRoutes path="/activate">
          <Activate />
        </SemiProtectedRoutes>

        <ProtectedRoutes path="/rooms">
          <Rooms />
        </ProtectedRoutes>

        <ProtectedRoutes path="/room/:id">
          <Room />
        </ProtectedRoutes>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

const SemiProtectedRoutes = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  console.log("Auth", isAuth, user.activated);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};

const ProtectedRoutes = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

export default App;
