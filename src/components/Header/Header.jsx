export const Header = () => (
  <header className="p-3 border-bottom">
    <div className="container-fluid">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        <div className="d-flex align-items-center">
          {/* Notification Dropdown */}
          <div className="dropdown text-end me-3">
            <a
              href="#"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownNotifications"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <i className="bi bi-bell fs-5"></i>
            </a>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownNotifications">
              <li>
                <a className="dropdown-item" href="#">
                  알림 1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  알림 2
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  알림 3
                </a>
              </li>
            </ul>
          </div>

          {/* User Dropdown */}
          <div className="dropdown text-end">
            <a
              href="#"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img
                src="https://github.com/mdo.png"
                alt="User Avatar"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
);
