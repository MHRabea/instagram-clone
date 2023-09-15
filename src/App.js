import React ,{Suspense, lazy , useContext}from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import * as ROUTES from "./components/routes";
import { AuthContext } from "./context/authcontext";
import Home from "./pages/home";


const Login = lazy(() => import ("./pages/login.js"))
// const Home = lazy(() => import ("./pages/home.js"))
const Sign_Up = lazy(() => import ("./pages/signUp.js"))
const Not_Found = lazy(() => import ("./pages/notFound.js"))


function App() {

  const ProtectedRoute = ({ children }) => {
    let Location = useLocation()
    const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (<Navigate to="/login" state={{ from: Location}} replace/>);
  }
  return children;
};


  return (
    <Router>
    <Suspense fallback={<p>Loding.....</p>}>
    <Routes>
      <Route path={ROUTES.Login} Component={Login}/>
      <Route path={ROUTES.Home} index
      element={
        <ProtectedRoute>
          <Home  />
        </ProtectedRoute>
      } />
      <Route path={ROUTES.Sign_Up} Component={Sign_Up} />
      <Route path={ROUTES.Not_Found} Component={Not_Found} />
    </Routes>
    </Suspense>
    </Router>
  );
}

export default App;
<div className="App">
      Added login
      </div>