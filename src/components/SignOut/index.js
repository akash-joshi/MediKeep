import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a
    href="#signout"
    style={{
      textDecoration: `none`,
      color: `black`,
    }}
    onClick={firebase ? firebase.doSignOut : () => {}}
  >
    Logout
  </a>
);

export default withFirebase(SignOutButton);
