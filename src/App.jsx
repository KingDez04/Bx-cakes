import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Toaster
        position="top-center"
        gutter={16}
        toastOptions={{
          duration: 5000,
          success: { duration: 5000 },
          error: { duration: 6000 },
          loading: { duration: Infinity },
        }}
      />
      <Routes>
        <Route path="*" element={<div>Welcome to the App!</div>} />
      </Routes>
    </Router>
  );
};
export default App;
