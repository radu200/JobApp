import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { getAllNotifications } from "../../../redux/chat/selectors";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import MainSideNav from "./MainSideNav";
import withAuth from "../../../HOC/auth/Auth";
import Translator from "../../../Utils/Translator";
import ModalPremium from "../../payment/ModalPremium";
import withMembershipModal from "../../../HOC/modal/membershipModal";
import Logo from '../../logo/Logo'

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
    margin: 0,
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
  notification: {
    margin: "5px",
  },
});

class MainNavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    // open: false,
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
    const {
      classes,
      auth,
      role,
      notifications,
      handleModalOpen,
      handleModalClose,
      openModalMembership,
    } = this.props;
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
            <MainSideNav
              auth={auth}
              role={role}
              handleModalOpen={handleModalOpen}
            />
           
            <Logo />
            <div className={classes.grow} />

            {role && role === "employer" ? (
              <div className={classes.employerNavItems}>
                <Button
                  className={classes.btnPremium}
                  onClick={handleModalOpen}
                  variant="contained"
                  color="primary"
                >
                  Premium
                </Button>
                <MenuItem button component="a" href="/api/my-jobs">
                  Locuri de muncă
                </MenuItem>
                <MenuItem button>
                  <Link className={classes.links} to="/chat">
                    <Badge
                      className={classes.notification}
                      badgeContent={notifications > 0 ? notifications : null}
                      color="secondary"
                    >
                      Chat
                    </Badge>
                  </Link>
                </MenuItem>
                <MenuItem button>
                  <Link className={classes.links} to="/search-candidate">
                    Căutarea lucratori
                  </Link>
                </MenuItem>
              </div>
            ) : null}

            {role && role === "jobseeker" ? (
              <div className={classes.employerNavItems}>
                <MenuItem button>
                  <Link className={classes.links} to="/chat">
                    <Badge
                      className={classes.notification}
                      badgeContent={notifications > 0 ? notifications : null}
                      color="secondary"
                    >
                      Chat
                    </Badge>
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
                  <a className={classes.links} href={SignUpUrlEmployer}>
                    <Button color="inherit">Inregistrare</Button>
                  </a>
                  <a className={classes.links} href={LoginUrl}>
                    <Button color="inherit">Logare</Button>
                  </a>
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
        <ModalPremium
          open={openModalMembership}
          handleClose={handleModalClose}
        />
        {/* <div className={classes.translator}> <Translator/></div> */}
      </div>
    );
  }
}

MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = state => ({
  notifications: 0
});

export default compose(
  withMembershipModal,
  withAuth,
  withStyles(styles),
  connect(mapState, { getAllNotifications }),
)(MainNavBar);
