import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ValidateUser from "./context/ValidateUser";

const App = () => {
  return (
    <BrowserRouter>
      <ValidateUser>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ValidateUser>
    </BrowserRouter>
  );
}

export default App;