import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { AuthUserContext } from "./Session";
import { SignInGoogleHeader } from "./SignIn";
import SignOutButton from "./SignOut";

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
      padding: "0.5em",
      color: "#06B39B",
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `0.5em 2em`,
        display: "flex",
        justifyContent: "space-between",
        maxWidth: 1200,
      }}
    >
      <div
        style={{
          margin: 0,
          fontSize: "1.3em",
          fontWeight: 600,
          paddingBottom: "0.1em",
        }}
      >
        <AuthUserContext.Consumer>
          {(authUser) =>
            authUser ? (
              <Link
                to="/home
                "
                style={{
                  color: `#06B39B`,
                  textDecoration: `none`,
                }}
              >
                {siteTitle}
              </Link>
            ) : (
              <Link
                to="/"
                style={{
                  color: `#06B39B`,
                  textDecoration: `none`,
                }}
              >
                {siteTitle}
              </Link>
            )
          }
        </AuthUserContext.Consumer>
      </div>
      <div
        style={{
          margin: 0,
          fontSize: "1em",
          fontWeight: 600,
          paddingTop: "0.1em",
        }}
      >
        <AuthUserContext.Consumer>
          {(authUser) =>
            authUser ? (
              <>
                <Link
                  to="/home"
                  style={{
                    textDecoration: `none`,
                    marginRight: "1em",
                    color: `black`,
                  }}
                >
                  Home
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/signin"
                style={{
                  textDecoration: `none`,
                  marginRight: "1em",
                  color: `black`,
                }}
              >
                Sign In
              </Link>
            )
          }
        </AuthUserContext.Consumer>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
