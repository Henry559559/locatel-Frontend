import Layout from "../../hocs/Layout"
import { Link } from "react-router-dom"
const Error404 = () =>{
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-2xl font-medium text-gray-700 mb-4">Page Not Found</p>
                <p className="text-gray-500 mb-8">
                    The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Go back home
                </Link>
            </div>
        </div>
    )
}

export default Error404
