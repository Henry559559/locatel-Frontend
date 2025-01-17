import Layout from "../../hocs/Layout"
import { useState, useEffect} from "react"
import { connect } from "react-redux"
import { signup } from "../../redux/actions/auth"

function Signup({
    signup
}) {
    
    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])
    
    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        dni: '',
        telefono: '',
        direccion: '',
        password: '',
        re_password: ''
    })

    const { 
        email,
        first_name,
        last_name,
        dni,
        telefono,
        direccion,
        password,
        re_password
    } = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value}); 
    const onSubmit = e => {
        e.preventDefault();
        signup( 
            email,
            first_name,
            last_name,
            dni,
            telefono,
            direccion,
            password,
            re_password
        );
        setAccountCreated(true);
        window.scrollTo(0,0)
    }



    return (
      <Layout>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={e=>onSubmit(e)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e=>onChange(e)}
                      id="email"
                      name="email"
                      value={email}
                      type="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e=>onChange(e)}
                      id="first_name"
                      name="first_name"
                      value={first_name}
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e=>onChange(e)}
                      id="last_name"
                      name="last_name"
                      value={last_name}
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                    No. De Documento
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e=>onChange(e)}
                      id="dni"
                      name="dni"
                      value={dni}
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Telefono
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e=>onChange(e)}
                      id="telefono"
                      name="telefono"
                      value={telefono}
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                   Direccion de Residencia
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e=>onChange(e)}
                      id="direccion"
                      name="direccion"
                      value={direccion}
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e=>onChange(e)}
                      id="password"
                      name="password"
                      value={password}
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Repeat Password
                  </label>
                  <div className="mt-1">
                    <input
                     onChange={e=>onChange(e)}
                      name="re_password"
                      value={re_password}
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  const mapStateToProps = state => ({});

  export default connect(mapStateToProps,{signup}) (Signup)