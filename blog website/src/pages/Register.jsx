import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900 mb-2">
          Join Monoblog
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-2xl shadow-gray-200/50 sm:rounded-3xl sm:px-12 border border-gray-100 relative overflow-hidden">
          <form className="space-y-6" action="#" method="POST">
             <div>
              <label htmlFor="name" className="block text-sm font-bold leading-6 text-gray-900 uppercase tracking-widest mb-3">
                Full Name
              </label>
              <div className="mt-2 text-gray-900 font-medium">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-xl border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm transition-all hover:bg-gray-50/50"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900 uppercase tracking-widest mb-3">
                Email address
              </label>
              <div className="mt-2 text-gray-900 font-medium">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm transition-all hover:bg-gray-50/50"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900 uppercase tracking-widest mb-3">
                Password
              </label>
              <div className="mt-2 text-gray-900 font-medium">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-xl border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm transition-all hover:bg-gray-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-gray-900 px-3 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-xs text-gray-500">
             By signing up, you agree to our <a href="#" className="font-semibold text-gray-900">Terms of Service</a> and <a href="#" className="font-semibold text-gray-900">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
