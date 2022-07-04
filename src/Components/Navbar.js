import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import { userIsInRole, roles } from "../Utility/roles";

const ResponsiveAppBar = () => {
  let navigate = useNavigate();
  const [pages, setPages] = React.useState([]);
  const [settings, setSettings] = React.useState([]);
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      let tempPages = [
        { label: "Home", url: "Home" },
        { label: "Employees", url: "Employees" },
        { label: "Departments", url: "departments" },
      ];
      if (userIsInRole(roles.admin) === false) {
      }
      if (
        userIsInRole(roles.admin) ||
        userIsInRole(roles.hrJunior) ||
        userIsInRole(roles.hrSenior)
      ) {
        tempPages.push({ label: "Job Postings", url: "Jobs" });
        tempPages.push({ label: "Applications", url: "applications" });
        if (userIsInRole(roles.admin) === false) {
          tempPages.push({ label: "Vacation Requests", url: "vacations" });
          tempPages.push({ label: "Tickets", url: "Tickets" });
        }
      } else {
        tempPages.push({ label: "My Vacations", url: "vacations" });
        tempPages.push({ label: "My Tickets", url: "Tickets" });
      }
      if (userIsInRole(roles.admin) === false) {
        setSettings([{ label: "My Profile", url: "myProfile" }]);
      }
      setPages(tempPages);
    }
  }, [localStorage.getItem("token")]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === "Home") {
      navigate(`/`);
      return;
    }
    if (typeof page === "string" || page instanceof String) {
      navigate(`${page}`);
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Home") {
      navigate(`/`);
      return;
    }
    if (typeof setting === "string" || setting instanceof String) {
      navigate(`${setting}`);
    }
  };
  const logout = () => {
    setAnchorElUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    localStorage.removeItem("userPfpUrl");
    setPages([]);
    setSettings([]);
    navigate("login");
  };

  const currUserPfpUrl = localStorage.getItem("userPfpUrl");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Meta-HR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCloseNavMenu(page.url)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Meta-HR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleCloseNavMenu(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {localStorage.getItem("token") ? (
                  <Avatar
                    src={
                      currUserPfpUrl
                        ? currUserPfpUrl
                        : "/static/images/avatar/2.jpg"
                    }
                  />
                ) : null}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCloseUserMenu(setting.url)}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
              {localStorage.getItem("token") && (
                <MenuItem
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={logout}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
