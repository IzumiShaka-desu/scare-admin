import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import AddUser from './pages/AddAdmin';
import { BrowserRouter as Router, NavLink, Link, createBrowserRouter, Route, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <Login />
      ),
    },
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Dashboard />
        </div>
      ),
    },
    {
      path: "/users",
      element: (
        <div>
          <Navbar >
            <Users />
          </Navbar>

        </div>
      ),
    },
    {
      path: "/users/add",
      element: (
        <div>
          <Navbar >
            <AddUser />
          </Navbar>

        </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
