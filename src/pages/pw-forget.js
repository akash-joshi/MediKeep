import React, { Fragment } from 'react';

import Layout from '../components/layout';
import PasswordForgetForm from '../components/PasswordForget';

const seo = {
  title: 'Forgot Password',
};

const PasswordForgetPage = () => (
  <Fragment>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </Fragment>
);

export default () => (
  <Layout seo={seo}>
    <PasswordForgetPage />
  </Layout>
);
