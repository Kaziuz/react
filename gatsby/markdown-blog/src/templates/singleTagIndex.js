import React from 'react'
import { graphql, Link } from 'gatsby'

const SingleTagIndex = ({ data, pageContext }) => {
  console.log('single tag', pageContext)
  return (
    <div>
      <div>single tag here</div>
    </div>
  )
}

export default SingleTagIndex