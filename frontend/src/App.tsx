import { Container, CssBaseline, Typography } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSlice";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Photos from "./features/photos/containers/Photos";
import CreatePhoto from "./features/photos/containers/CreatePhoto";
import UserGallery from "./features/photos/containers/UserGallery";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Photos />} />
            <Route path="/photos/:id" element={<UserGallery />} />

            <Route
              path="/photos/create"
              element={
                <ProtectedRoute
                  isAllowed={
                    (user && user.role === "admin") || user?.role === "user"
                  }
                >
                  <CreatePhoto />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <Typography variant="h1" sx={{ textAlign: "center" }}>
                  Not found
                </Typography>
              }
            />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
