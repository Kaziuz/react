import React from "react"
import { graphql, Link } from 'gatsby'
import Header from '../components/Header'

const content = edges => {
  return edges.map(edge => {
    const { frontmatter } = edge.node
    return (
      <div 
        key={frontmatter.path}
        style={{ marginBottom: '1rem' }}
      ><Link to={frontmatter.path}>
        {frontmatter.title}
        </Link>
      </div>
    )
  })
}

const Layaout = props => {
  const { edges } = props.data.allMarkdownRemark
  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'avenir'
      }}>
        {content(edges)}
      </div>
    </div>
  )
}

export const query = graphql`
query HomepageQuery {
  allMarkdownRemark (
    sort: { order: ASC, fields: [frontmatter___date] }
  ) {
    edges {
      node {
        html
        frontmatter {
          title
          path
          date
        }
      }
    }
  }
}
`

export default Layaout
