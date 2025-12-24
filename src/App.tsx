import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routers";
import DefaultLayout from "./components/layout/DefaultLayout";
import { Fragment } from "react/jsx-runtime";
import DefaultLayoutClub from "./components/layout/DefaultLayoutClub";

import FloatingChat from "./components/FloatingChat";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            if (route.layout === "navbarClub") {
              Layout = DefaultLayoutClub;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <FloatingChat />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          closeButton={false}
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
