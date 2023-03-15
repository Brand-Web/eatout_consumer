
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  redirect,
  
} from "react-router-dom";
import RestaurantHome from './pages/RestaurantPage';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index loader={()=>redirect("/abcd1234efgh5678")} element={<Home/>} />
      <Route path=":clientId" element={<RestaurantHome />} >
        <Route index element={<div>resto home</div>} />

      </Route>
    </Route>
  )
);
function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App

