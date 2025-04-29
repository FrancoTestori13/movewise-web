import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="w-full bg-sky-900 py-16 px-6 md:px-20 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className=" flex-2 flex items-start justify-center">
            <img
              src="/imghome.png"
              alt="Mudanza organizada"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex-1 items-center text-center justify-start pt-10">
            <h1 className=" md:text-5xl font-bold text-white mb-30">
              Organiza tu Mudanza con Eficiencia
            </h1>
            <div className="bg-white/10 rounded-2xl p-9">
              <p className="md:text-2xl text-white mb-6">
                Simplifica tu mudanza con el poder de la inteligencia
                artificial. Crea inventarios, genera etiquetas QR y mantén todo
                bajo control.
              </p>
              <a
                href="/login"
                className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Empezar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className=" flex-2 flex items-start justify-center">
            <img
              src="/imghome2.png"
              alt="Mudanza organizada"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex-1 items-center">
            <h1 className="md:text-5xl font-bold text-rose-600 mb-30">
              Registro de Cajas, Mobiliario y Objetos
            </h1>
            <div>
              <p className="md:text-3xl text-neutral-700 mb-6">
                Los usuarios pueden organizar y clasificar los objetos antes de
                la mudanza, asegurando que cada artículo esté correctamente
                identificado y registrado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-rose-600 mb-6">
            Reconocimiento de Objetos con IA
          </h1>
          <p className="text-2xl text-neutral-700 mb-12">
            Utilizando inteligencia artificial, la aplicación movil puede
            identificar y etiquetar automáticamente los objetos dentro de las
            cajas. Esto ayuda a crear un inventario preciso sin la necesidad de
            registrar manualmente cada artículo
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-60">
            <div className="flex flex-col items-center">
              <img src="/icon1.png" alt="Cajas" className="w-25 h-25 mb-4" />
            </div>

            <div className="flex flex-col items-center">
              <img src="/icon2.png" alt="IA" className="w-25 h-25 mb-4" />
            </div>

            <div className="flex flex-col items-center">
              <img src="/icon3.png" alt="Task" className="w-27 h-27 mb-4 " />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className=" flex-2 flex items-start justify-center">
            <img
              src="/imghome3.png"
              alt="Mudanza organizada"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex-1 items-center">
            <h1 className="md:text-5xl font-bold text-rose-600 mb-30">
              Generación de Etiquetas QR
            </h1>
            <div>
              <p className="md:text-3xl text-neutral-700 mb-6">
                La aplicación genera etiquetas QR personalizadas para cada caja,
                las cuales pueden ser impresas y pegadas en las cajas. Estas
                etiquetas permiten escanear y acceder rápidamente al contenido
                de cada caja.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-sky-900 py-24 px-6 md:px-20">
        <div className="relative max-w-md mx-auto flex flex-col items-center justify-center text-center bg-white p-10 rounded-2xl">
          <img
            src="/imgqr.png"
            alt="Logo"
            className="w-40 h-40 object-contain mb-6"
          />

          <a
            href="/descargar"
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-rose-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-rose-700"
          >
            Descargar aplicación
          </a>
        </div>
      </footer>
    </>
  );
}
