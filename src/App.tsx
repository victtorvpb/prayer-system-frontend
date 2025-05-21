import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppRoutes } from "./routes";

function App() {
  const location = useLocation();
  const isAuthPage = ["/login", "/esqueci-senha", "/cadastrar"].includes(
    location.pathname
  );

  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <Navbar>
      <AppRoutes />
    </Navbar>
  );
}

export default App;
