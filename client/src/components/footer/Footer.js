import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Logo from "../logo/Logo";
import { BrandName } from "../../Utils/BrandName";

function Copyright() {
  const classes = useStyles();
  return (
    <>
      <Typography
        className={classes.CopyrightContainer}
        variant="div"
        color="textSecondary"
      >
        <Logo />
        {`© ${BrandName} `}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="span"
        color="textSecondary"
        align="center"
      ></Typography>
    </>
  );
}
const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: "none",
    },
  },
  CopyrightContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  CopyrightText: {
    // marginLeft: 20,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },

  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  {
    title: "Info",
    description: [
      {
        name: "Despre Noi",
        url: "/about/us",
      },
      {
        name: "Postează un loc de muncă ",
        url: "/api/signup/employer",
      },
      {
        name: "Platile ",
        url: "/payment",
      },
    ],
  },
  {
    title: "Support",
    description: [
      {
        name: "Ajutor",
        url: "/api/contact-us",
      },
    ],
  },

  {
    title: "Urmeaza-ne",
    description: [
      { name: "Facebook", url: "https://www.facebook.com/" },
      { name: "Odnoklasniki", url: "https://www.facebook.com/" },
      { name: "Twitter", url: "https://www.facebook.com/" },
    ],
  },
];

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={12} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.url}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
