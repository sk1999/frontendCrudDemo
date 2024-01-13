import './App.css';
 import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
 import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import {EditUser} from './pages/EditUser';
import ViewUser from './pages/ViewUser';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/adduser" element={<AddUser />}/>
        <Route exact path="/edituser/:id" element={<EditUser />}/>
        <Route exact path="/viewuser/:id" element={<ViewUser />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
