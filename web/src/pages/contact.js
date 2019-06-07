import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import { responsiveTitle1 } from '../components/typography.module.css'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      title
      _rawBody
    }
  }
`

const ContactPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data.page

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <h1 className={responsiveTitle1}>{page.title}</h1>
        <BlockContent blocks={page._rawBody || []} />
        <div className='contactform'>
          <form name='contact' method='post' data-netlify='true' data-netlify-honeypot='bot-field'>
            <input type='hidden' name='form-name' value='contact' />
            <p hidden>
              <label>
                Don’t fill this out: <input name='bot-field' />
              </label>
            </p>
            <p>
              <label>
                Your name:
                <br />
                <input type='text' name='name' />
              </label>
            </p>
            <p>
              <label>
                Your email:
                <br />
                <input type='email' name='email' />
              </label>
            </p>
            <p>
              <label>
                Message:
                <br />
                <textarea name='message' />
              </label>
            </p>
            <p>
              <button type='submit'>Send</button>
            </p>
          </form>
        </div>
      </Container>
    </Layout>
  )
}
ContactPage.defaultProps = {
  data: {
    page: {
      title: 'No title'
    }
  }
}
export default ContactPage
