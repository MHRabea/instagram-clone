import React ,{Suspense, lazy}from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import * as ROUTES from "./components/routes";

const Login = lazy(() => import ("./pages/login.js"))
const Home = lazy(() => import ("./pages/home.js"))
const Sign_Up = lazy(() => import ("./pages/signUp.js"))

function App() {
  return (
    <Router>
    <Suspense fallback={<p>Loding.....</p>}>
    <Routes>
      <Route path={ROUTES.Login} Component={Login}/>
      <Route path={ROUTES.Home} Component={Home} />
      <Route path={ROUTES.Sign_Up} Component={Sign_Up} />
    </Routes>
    </Suspense>
    </Router>
  );
}

export default App;
<div className="App">
      Added login 
      </div>