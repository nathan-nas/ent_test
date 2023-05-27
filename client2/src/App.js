import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import BOM from "./pages/BOMView"
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/bom/:id" element={<BOM />} />
      </Routes>
  );
}

export default App;