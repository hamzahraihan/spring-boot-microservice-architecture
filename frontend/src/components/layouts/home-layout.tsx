import { NavLink, Outlet } from "react-router";
import "./home-layout.css";
import { useKeycloak } from "../../hooks/useKeycloak";

function HomeLayout() {
  const { keycloak, isAuthenticated } = useKeycloak();
  return (
    <div className="container">
      <div className="navbar">
        <div className="container-navbar">
          <div className="title-navbar">Microshop</div>
          <nav aria-label="Primary">
            <ul className="nav-menu">
              <li>
                <NavLink to="/" className="nav-link">
                  Products
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="auth-actions">
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
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomeLayout;
