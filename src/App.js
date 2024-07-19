import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route) => {
            if (route.isPrivate) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRoute
                      element={route.element}
                      isPrivate={route.isPrivate}
                      isAdmin={route.isAdmin}
                    />
                  }
                />
              );
            } else {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PublicRoute element={route.element} />}
                />
              );
            }
          })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
