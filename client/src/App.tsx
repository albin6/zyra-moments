import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientRoutes from "./routes/ClientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import VendorRoutes from "./routes/VendorRoutes";
import { Toaster } from "sonner";
import UnauthorizedPage from "./components/UnauthorizedPage";
import { Custom404 } from "./components/404/Custom404";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <AppLayout />
    </SocketProvider>
  );
}

export default App;

function AppLayout() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/vendor/*" element={<VendorRoutes />} />
        <Route
          path="*"
          element={<Custom404 pathname={window.location.pathname} />}
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}
