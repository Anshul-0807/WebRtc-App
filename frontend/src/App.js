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

const isAuth = false;

const user = {
  activated: false , 
};

function App() {
  return (
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

      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
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

const SemiProtectedRoutes = ({children , ...rest}) => {
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

const ProtectedRoutes = ({children , ...rest}) => {
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
 