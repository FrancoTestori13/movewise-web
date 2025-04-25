"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Toast from "../components/toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/dashboard", { credentials: "include" })           
      .then(res => {
        if (res.ok) {
          router.replace("/dashboard");  
        }
      })
      .catch(() => {
        
      });
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Respuesta del servidor:", data); 

      if (data.success) {
        router.push("/dashboard");
      } else {
        setMessage(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error del servidor");
    }
  };
  return (
    <>
      <Navbar />

      <section className="w-full h-[calc(100vh-4.75rem)] bg-white flex items-center justify-center mt-[4.75rem] overflow-hidden">
        <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-[90%] md:w-[70%] max-w-5xl h-[85%] overflow-hidden">
          <div className="md:w-1/2 p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl text-center font-bold text-sky-900 mb-6">
                Bienvenido
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

              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border text-gray-600 border-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border text-gray-600 border-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <a
                  href="#"
                  className="text-sm text-rose-600 hover:underline text-right"
                >
                  ¿Olvidaste tu contraseña?
                </a>

                <button
                  type="submit"
                  className="bg-rose-600 text-center text-white font-semibold py-3 rounded-lg mt-2 hover:opacity-90 transition cursor-pointer"
                >
                  Login
                </button>
              </form>
            </div>

            <p className="text-sm text-center text-gray-600 mt-6">
              ¿No tienes cuenta?{" "}
              <a
                href="/register"
                className="text-rose-600 hover:underline font-medium"
              >
                Registrarse
              </a>
            </p>
          </div>

          <div className="hidden md:block md:w-1/2 p-5">
            <img
              src="/loginimg.png"
              alt="Imagen login"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <Toast message={message} clearMessage={() => setMessage("")} />
    </>
  );
}
