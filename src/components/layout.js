import React, { Component, Fragment } from "react";
import styled from "styled-components";

import getFirebase, { FirebaseContext } from "./Firebase";
import withAuthentication from "./Session/withAuthentication";
import { useStaticQuery, graphql } from "gatsby";
import "semantic-ui-css/semantic.min.css";

import Root from "./Root";

import Header from "./header";
import "./layout.css";

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
    const app = import("firebase");
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
  background,
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
      style={{
        minHeight: "89vh",
        background: background ? background : "rgb(234 241 255)",
        position: "relative",
      }}
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
