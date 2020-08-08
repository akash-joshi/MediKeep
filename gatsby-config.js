require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Essayer`,
    description: `An online essay writing platform providing you a way
    to practise essays in a real environment, with real
    GRE topics.`,
    author: `Akash Enterprises`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Essayer`,
        short_name: `Essayer`,
        start_url: `/`,
        background_color: `#eefff0`,
        theme_color: `#eefff0`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-136873075-3",
        head: false,
        anonymize: true,
        respectDNT: true,
        defer: true,
      },
    },
    {
      resolve: 'gatsby-plugin-crisp-chat',
      options: {
        websiteId: '3ff332b2-1b79-445e-9268-ce1e1a1a5859',
        defer: true,
      },
    }
  ],
};
