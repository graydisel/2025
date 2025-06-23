import { useRouteError } from 'react-routes'

const ErrorBoundary = () => {
    const error = useRouteError() as Error;

    console.log('Error', error.message);

    return (
        <div>
            <h3>Some error happen. Please return to the main page.</h3>
        </div>
    )
}

export default ErrorBoundary