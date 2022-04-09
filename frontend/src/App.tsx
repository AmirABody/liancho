import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import Landing from "./pages/Home";
import { ReactQueryDevtools } from "react-query/devtools";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "./components/CustomToast";
import { AlertContainer } from "./components/ConfirmAlert";

const queryClient = new QueryClient();

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="font-danafanum">
          <ToastContainer />
          <AlertContainer />
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/loading" element={<Loading />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
