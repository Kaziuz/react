// 
import React from 'react'
import { graphql, Link } from 'gatsby'

const Template = ({ data, pageContext }) => {
  // console.log(pageContext)
  const {next, prev} = pageContext
  const { markdownRemark } = data
  const { title } = markdownRemark.frontmatter
  const { html } = markdownRemark

  return (
    <div>
      <h1>{title}</h1>
      <div className='blogpost' 
        dangerouslySetInnerHTML={{__html: html}}
      />
      { next && 
        <Link to={next.frontmatter.path} style={{float: 'right'}}>
          Next
        </Link>
      }
      { prev && 
        <Link to={prev.frontmatter.path} style={{float: 'left'}}>
          prev
        </Link>
      }
    </div>
  )
}

// el pathSlug es el key del createpage en context
export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug} }) { 
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template