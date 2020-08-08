import React from "react"

import SEO from "../seo"

import "./min.css"

export default function Root({ seo }) {
  return (
    <>
      <SEO title={seo.title} />
    </>
  )
}
