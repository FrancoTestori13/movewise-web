"use client";
import {
  PackageOpen,
  QrCode,
  Tags,
  Settings,
  HelpCircle,
  LogOut,
  CirclePlus,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <aside className="bg-sky-900 w-20 flex flex-col justify-between items-center py-6">
        <div className="flex flex-col items-center gap-8">
          <Image src="/logowhite.png" alt="Logo" width={40} height={40} />

          <div className="flex flex-col gap-6 text-white text-2xl">
            <button className="hover:opacity-80 transition" title="Cajas">
              <PackageOpen size={24} />
            </button>
            <button className="hover:opacity-80 transition" title="Cajas">
              <QrCode size={24} />
            </button>
            <button className="hover:opacity-80 transition" title="Mudanzas">
              <Tags size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-white text-2xl">
          <button className="hover:opacity-80 transition" title="Ajustes">
            <Settings size={24} />
          </button>
          <button className="hover:opacity-80 transition" title="Ayuda">
            <HelpCircle size={24} />
          </button>
          <button className="hover:opacity-80 transition" title="Salir">
            <LogOut size={24} />
          </button>
        </div>
      </aside>

      <aside className="bg-gray-100 w-64 p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-700"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-neutral-700 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-600 text-center placeholder:text-center"
            />
          </div>

          <div className="flex items-center my-1">
            <hr className="flex-grow border-neutral-700" />
          </div>

          <div className="flex flex-col gap-4">
            <button className="flex items-center gap-10 text-neutral-700 font-medium hover:text-sky-600 transition">
              <CirclePlus size={20} />
              Añadir zona
            </button>

            <button className="flex items-center gap-10 text-neutral-700 font-medium hover:text-sky-600 transition">
              <CirclePlus size={20} />
              Añadir objeto
            </button>
          </div>
        </div>

        <button className="flex items-center gap-10 text-neutral-700 font-medium hover:text-sky-600 transition">
          <Trash2 size={20} />
          Ver papelera
        </button>
      </aside>

      <main className="flex-1 p-6 bg-white"></main>
    </div>
  );
}
