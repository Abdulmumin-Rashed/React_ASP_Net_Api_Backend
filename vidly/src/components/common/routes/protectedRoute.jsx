import { Route, Redirect } from "react-router-dom";
import auth from "../../../services/authService";

const ProtectedRoute = ({ path, render, component: Component, ...res }) => {
  const user = auth.getCurrentUser();

  return (
    <Route
      {...res}
      render={(props) => {
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
