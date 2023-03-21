// @ts-nocheck

import NextErrorComponent from 'next/error'
import * as Sentry from '@sentry/nextjs'
import { NextPageContext } from 'next'

const MyError = (props) => {
    // If you're using a Nextjs version prior to 12.2.1, uncomment this to
    // compensate for https://github.com/vercel/next.js/issues/8592
    // Sentry.captureUnderscoreErrorException(props);

    return <NextErrorComponent statusCode={props.statusCode} />
}

MyError.getInitialProps = async (context: NextPageContext) => {
    // In case this is running in a serverless function, await this in order to give Sentry
    // time to send the error before the lambda exits
    await Sentry.captureUnderscoreErrorException(contextData)

    // This will contain the status code of the response
    return NextErrorComponent.getInitialProps(contextData)
}

export default MyError
