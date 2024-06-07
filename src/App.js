
import Success from "./components/Success";
import FormComponents from "./components/FormComponents";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      
      path: "/",
      element: <FormComponents/>,
    },
    {
      
      path: "/success",
      element: <Success/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
