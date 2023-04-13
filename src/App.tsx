import { Outlet } from "react-router-dom";
import { useInit } from "./hooks";

function App() {
  useInit();
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;

export const TableView = () => {
  return <Outlet />;
};
