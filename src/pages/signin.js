import React, { useContext } from "react";
import { navigate } from "gatsby";

import Layout from "../components/layout";
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from "../components/SignIn";
import { SignUpLink } from "../components/SignUp";
import { PasswordForgetLink } from "../components/PasswordForget";

import CardContainer from "../components/Containers/CardContainer";
import { AuthUserContext } from "../components/Session";

const seo = {
  title: "Sign In",
};

const SignInPage = () => {
  const authUser = useContext(AuthUserContext);

  if (authUser) {
    navigate("/");
  }

  return (
    <CardContainer style={{ padding: 0, minHeight: "96vh" }}>
      <div
        style={{
          padding: "0.75em 1em",

          fontSize: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 600 }}>Sign In</span>
        <span style={{ fontSize: 20 }}>MediKeep</span>
      </div>

      <div
        style={{
          padding: "1em",
          borderTop: "2px solid #EFF2F8",
          height: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <SignInForm /> */}

        <SignInGoogle />
        {/* <PasswordForgetLink /> */}
        {/* <SignUpLink /> */}
      </div>
    </CardContainer>
  );
};

export default () => (
  <Layout seo={seo}>
    <SignInPage />
  </Layout>
);
