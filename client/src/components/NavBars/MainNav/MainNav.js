import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import MainSideNav from "./MainSideNav";
import { BrandName } from "../../../Utils/BrandName";
import withAuth from "../../../HOC/auth/Auth";
import Translator from "../../../Utils/Translator";
import ModalPremium from "../../payment/ModalPremium";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Profile,
  Settings,
  LogOut,
  SignUpUrlJobSeeker,
  SignUpUrlEmployer,
  LoginUrl,
} from "../../../Utils/Paths/UrlPaths";

const styles = theme => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  logIn: {
    color: "white",
    textDecoration: "none",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    backgroundColor: "#2552C7",
    margin:0
  },
  translator: {
    display: "flex",
    justifyContent: "flex-end",
  },
  links: {
    color: "white",
    textDecoration: "none",
  },
  btnPremium: {
    backgroundColor: "#ffd54f",
    color: "blue",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: "#ffd54f",
    },
  },

  employerNavItems: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
});

class MainNavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
  };

  handleModalOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, auth, role } = this.props;

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem button component="a" href={Profile}>
          <p>Profil</p>
        </MenuItem>
        <MenuItem button component="a" href={Settings}>
          <p>Setari</p>
        </MenuItem>
        <Divider />
        <MenuItem button component="a" href={LogOut}>
          <p>Iesire</p>
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        {(role && role === "employer") || role === "jobseeker" ? (
          <div>
            <MenuItem button component="a" href={Profile}>
              <p>Profil</p>
            </MenuItem>
            <MenuItem button component="a" href={Settings}>
              <p>Setari</p>
            </MenuItem>
            <MenuItem button component="a" href={LogOut}>
              <p>Iesire</p>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem button component="a" href={SignUpUrlEmployer}>
              <p>Angajeaza</p>
            </MenuItem>
            <MenuItem button component="a" href={SignUpUrlJobSeeker}>
              <p>Inregistrare</p>
            </MenuItem>
            <MenuItem button component="a" href={LoginUrl}>
              <p>Logare</p>
            </MenuItem>
          </div>
        )}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <MainSideNav auth={auth} role={role} handleModalOpen={this.handleModalOpen} />
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {BrandName}
            </Typography>

            <div className={classes.grow} />

            {role && role === "employer" ? (
              <div className={classes.employerNavItems}>
                <Button
                  className={classes.btnPremium}
                  onClick={this.handleModalOpen}
                  variant="contained"
                  color="primary"
                >
                  Descopera Premium
                </Button>
                <MenuItem button component="a" href={"api/my-jobs"}>
                  Locuri de muncă
                </MenuItem>
                <MenuItem button>
                  <Link className={classes.links} to="/chat">
                    Chat
                  </Link>
                </MenuItem>
                <MenuItem button>
                  <Link className={classes.links} to="/search-candidate">
                    Căutarea lucratori
                  </Link>
                </MenuItem>
              </div>
            ) : null}

            <div className={classes.sectionDesktop}>
              {(role && role === "employer") || role === "jobseeker" ? (
                <div>
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  {renderMenu}
                </div>
              ) : (
                <>
                  <Button color="inherit">
                    <a className={classes.logIn} href={SignUpUrlEmployer}>
                      Angajeaza
                    </a>
                  </Button>
                  <Button color="inherit">
                    <a className={classes.logIn} href={SignUpUrlJobSeeker}>
                      Inregistrare
                    </a>
                  </Button>
                  <Button color="inherit">
                    <a className={classes.logIn} href={LoginUrl}>
                      Logare
                    </a>
                  </Button>
                </>
              )}
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        <ModalPremium open={this.state.open} handleClose={this.handleClose} />
        {/* <div className={classes.translator}> <Translator/></div> */}
      </div>
    );
  }
}

MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withAuth(withStyles(styles)(MainNavBar));
