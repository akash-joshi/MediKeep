import React, { Component, Fragment } from "react";
import styled from "styled-components";

import getFirebase, { FirebaseContext } from "./Firebase";
import withAuthentication from "./Session/withAuthentication";
import { useStaticQuery, graphql } from "gatsby";

import * as app from "firebase";
import "firebase/firestore";

import Root from "./Root";

import Header from "./header";
import "./layout.css";
import "semantic-ui-css/semantic.min.css";

const Main = styled.div`
  max-width: 1200px;
  @media only screen and (max-width: 1920px) {
    max-width: 960px;
  }
`;

class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const auth = import("firebase/auth");
    const database = import("firebase/database");

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication {...this.props} />
      </FirebaseContext.Provider>
    );
  }
}

const AppWithAuthentication = withAuthentication(function({
  children,
  seo,
}) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <section
      style={{ minHeight: "100vh", background: "rgb(255, 255, 255)" }}
    >
      {/* <Navigation /> */}
      <Root seo={seo} />
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <Main
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
          paddingTop: "1em",
        }}
      >
        <main>{children}</main>
        {/* <footer>
          © {new Date().getFullYear()}, Built with ❤️ in 🇮🇳 by
          {` `}
          <a href="https://akashj.com">Akash J.</a> &{" "}
          <a href="https://www.linkedin.com/in/akash-nainani">
            Akash N.
          </a>
        </footer> */}
      </Main>
    </section>
  );
});

export default Layout;
