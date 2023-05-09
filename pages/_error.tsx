import NextErrorComponent, { ErrorProps } from 'next/error'
import * as Sentry from '@sentry/nextjs'
import { NextPage, NextPageContext } from 'next'

const MyError: NextPage<ErrorProps> = (props) => {
    return <NextErrorComponent statusCode={props.statusCode} />
}

MyError.getInitialProps = async (context: NextPageContext) => {
    // In case this is running in a serverless function, await this in order to give Sentry
    // time to send the error before the lambda exits
    await Sentry.captureUnderscoreErrorException(context)

    // This will contain the status code of the response
    return NextErrorComponent.getInitialProps(context)
}

export default MyError
