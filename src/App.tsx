import { QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/pages/HomePage";
import { queryClient } from "@/config/tanstack-query-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
