import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Info_List from './Components/Info_List';
import Header from './Components/Header';
import Home from './Components/Home';




function App() {
  return (
    <Router>
    <Header/>
    <Routes>
          
          <Route path="/Calculator" element={<Info_List/>}/>
          <Route path="/" element={<Home />}/>
            
    </Routes>
    
    </Router>
  );
}

export default App;
