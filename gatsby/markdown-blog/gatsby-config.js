module.exports = {
  siteMetadata: {
    title: 'My Blog in gatsby',
    description: 'This is my cool blog.'
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve:  `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
        ignore: [`**/.*`, `**/.DS_Store`, `**/.gitignore`, `**/node_modules`], // ignore 
      }
    }
  ]
}