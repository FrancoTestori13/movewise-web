import Navbar from "../components/navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <section className="w-full h-[calc(100vh-4.75rem)] bg-white flex items-center justify-center mt-[4.75rem] overflow-hidden">
        <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-[90%] md:w-[70%] max-w-5xl h-[90%] overflow-hidden">
          <div className="md:w-1/2 p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl text-center font-bold text-sky-900 mb-6">
                Registrarse
              </h1>

              <button className="flex items-center justify-center gap-4 border border-gray-800 px-6 py-3 rounded-lg w-[70%] mx-auto mb-6 hover:bg-gray-100 transition">
                <img
                  src="/googleicon.png"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-950 font-medium">
                  Iniciar con Google
                </span>
              </button>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-900" />
                <span className="mx-4 text-sm text-gray-900">o</span>
                <hr className="flex-grow border-gray-900" />
              </div>

              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border text-gray-600 border-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="border text-gray-600 border-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="border text-gray-600 border-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                />
                <button
                  type="submit"
                  className="bg-rose-600 text-white font-semibold py-3 rounded-lg mt-2 hover:opacity-90 transition"
                >
                  Registrarse
                </button>
              </form>
            </div>

            <p className="text-sm text-center text-gray-600 mt-6">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="text-rose-600 hover:underline font-medium"
              >
                Iniciar sesión
              </a>
            </p>
          </div>

          <div className="hidden md:block md:w-1/2 p-5">
            <img
              src="/registerimg.png"
              alt="Imagen registro"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
