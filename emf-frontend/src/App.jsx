import "./App.css";
import AddEmployee from "./components/AddEmployee";
import Footer from "./components/Footer";
import { Heaer } from "./components/Header";
import ListEmployee from "./components/ListEmployee";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Heaer />
      <BrowserRouter>
        <Routes>
          {/* //http//localhost:3000 */}
          <Route path="/" element={<ListEmployee />}></Route>
          {/* //http//localhost:3000/employee */}
          <Route path="/employees" element={<ListEmployee />}></Route>
          {/* //http//localhost:3000/add-employee */}
          <Route path="/add-employee" element={<AddEmployee />}></Route>
          //http//localhost:3000/edit-employee/1
          <Route path="/edit-employee/:id" element={<AddEmployee />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
