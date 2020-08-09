import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { AuthUserContext } from "./Session";
import { SignInGoogleHeader } from "./SignIn";
import SignOutButton from "./SignOut";

const Header = ({ siteTitle }) => (
  <header
    style={{
      // background: `#C4C4C4`,
      padding: "0.5em",
      color: "#06B39B",
      // border: "2px solid #C4C4C4",
      // borderRadius: "0 0 25px 25px",
    }}
  >
    <div
      style={{
        margin: `0 auto 0.5em auto`,
        padding: `0.5em 2em`,
        display: "flex",
        justifyContent: "space-between",
        maxWidth: 1200,
      }}
    >
      
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
