import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail/>} />
    </Routes>
  );
}

export default App;
