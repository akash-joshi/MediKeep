import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';

const seo = {
  title: 'Sign Up',
};

const SignUpPage = () => (
  <Fragment>
    <h1>SignUp</h1>
    <SignUpForm />
  </Fragment>
);

export default () => (
  <Layout seo={seo}>
    <SignUpPage />
  </Layout>
);
