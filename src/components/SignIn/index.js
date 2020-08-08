import React, { Component } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import Swal from "sweetalert2";

import "./signin.css";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(r => {
        this.setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(async socialAuthUser => {
        console.error("signing in");
        const reqObject = {
          userId: socialAuthUser.user.uid,
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          name: socialAuthUser.user.displayName,
        };
        await axios
          .post(`https://essayerbackend.akashj.com/user`, reqObject)
          .then(r => {
            console.log(r.data);
            localStorage.setItem(
              "userObject",
              JSON.stringify(r.data),
            );
          })
          .catch(console.error);

        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });

        setTimeout(() => {
          console.error("Redirect");
          navigate(ROUTES.HOME);
        }, 2000);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        console.error(error);

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div onClick={this.onSubmit} className="google-btn">
          <img
            className="google-icon-svg"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />

          <div style={{ fontWeight: "bold" }} className="btn-text">
            Sign in with Google
          </div>
        </div>
        {/* <button type="submit">Sign In with Google</button> */}

        {error && (
          <p style={{ marginTop: "1em" }}>
            There was an error while signing you in: {error.message}
          </p>
        )}
      </form>
    );
  }
}

class SignInGoogleHeaderBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null, text: "Sign In" };
  }

  onSubmit = event => {
    this.setState({
      ...this.state,
      text: "Signing You In ...",
    });
    this.props.firebase
      .doSignInWithGoogle()
      .then(async socialAuthUser => {
        console.error("signing in");
        const reqObject = {
          userId: socialAuthUser.user.uid,
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          name: socialAuthUser.user.displayName,
        };
        await axios
          .post(`https://essayerbackend.akashj.com//user`, reqObject)
          .catch(e => {
            throw e;
          });

        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });

        setTimeout(() => {
          console.error("Redirect");
          navigate(ROUTES.HOME);
        }, 2000);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        console.error(error);

        this.setState({ error });
        Swal.fire("", error, "error");
      });

    event.preventDefault();
  };

  render() {
    const { error, text } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button
          style={{
            textDecoration: `none`,
            color: `black`,
            marginRight: "1em",
            background: "transparent",
            border: 0,
            cursor: "pointer",
          }}
          type="submit"
        >
          {text}
        </button>
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Twitter</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withFirebase(SignInFormBase);

const SignInGoogle = withFirebase(SignInGoogleBase);

const SignInFacebook = withFirebase(SignInFacebookBase);

const SignInTwitter = withFirebase(SignInTwitterBase);

const SignInGoogleHeader = withFirebase(SignInGoogleHeaderBase);

export default SignInForm;

export {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
  SignInGoogleHeader,
};
