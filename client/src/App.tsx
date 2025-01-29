import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientRoutes from "./routes/ClientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import VendorRoutes from "./routes/VendorRoutes";

function App() {
  return <AppLayout />;
}

export default App;

function AppLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/vendor/*" element={<VendorRoutes />} />
      </Routes>
    </Router>
  );
}
