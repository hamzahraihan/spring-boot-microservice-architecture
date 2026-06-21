import { Outlet } from "react-router";
import "./home-layout.css";
import { useKeycloak } from "../../hooks/useKeycloak";

function HomeLayout() {
  const { keycloak, isAuthenticated } = useKeycloak();
  return (
    <div className="container">
      <div className="navbar">
        <div className="container-navbar">
          <div className="title-navbar">Microshop</div>
          <ul className="nav-menu">
            <li>
              <button>Products</button>
            </li>
            <li>
              <button>Services</button>
            </li>
            <li>
              <button>About</button>
            </li>
          </ul>

          <div>
            {isAuthenticated ? (
              <button
                className="btn btn-logout"
                onClick={() => keycloak?.logout()}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-login"
                onClick={() => keycloak?.login()}
              >
                Login
              </button>
            )}

            {isAuthenticated && (
              <button onClick={() => console.log(keycloak?.token)}>
                JWT token
              </button>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomeLayout;
