require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `MediKeep`,
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
        name: `MediKeep`,
        short_name: `MediKeep`,
        start_url: `/`,
        background_color: `#eefff0`,
        theme_color: `#eefff0`,
        display: `standalone`,
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
    }
  ],
};
