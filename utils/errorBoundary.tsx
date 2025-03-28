import { ErrorBoundary as SentryEB } from '@sentry/nextjs'

const ErrorBoundary = ({
    children,
    ...args
}: {
    children: React.ReactNode
}) => (
    <SentryEB
        fallback={({ error, eventId }) => (
            <div className="text-neutral-500 bg-red-200 dark:bg-red-800 p-2">
                Rendering error: {String(error)}
                <br />#{eventId}
            </div>
        )}
        {...args}
    >
        {children}
    </SentryEB>
)

export default ErrorBoundary
