"use client";
import React from "react";

interface Zone {
  id: number;
  custom_name: string;
  default_name: string;
}

interface BoxModalProps {
  zones: Zone[];
  zoneId: number | null;
  name: string;
  description: string;
  error: string;
  onChangeZone: (zoneId: number) => void;
  onChangeName: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const BoxesModal: React.FC<BoxModalProps> = ({
  zones,
  zoneId,
  name,
  description,
  error,
  onChangeZone,
  onChangeName,
  onChangeDescription,
  onClose,
  onSubmit,
}) => {
  return (
    <div
      className="absolute inset-0 bg-stone-900/20 flex items-center justify-center"
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-stone-100 p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
      >
        <h2 className="text-xl text-sky-900 text-center font-bold mb-4">
          Crear nueva caja
        </h2>
        <hr className="border-neutral-700 mb-4" />

        <label
          htmlFor="zone-select"
          className="block mb-2 text-sm font-medium text-neutral-700"
        >
          Zona
        </label>
        <select
          id="zone-select"
          value={zoneId ?? ""}
          onChange={(e) => onChangeZone(Number(e.target.value))}
          className="w-full border border-neutral-700 text-neutral-600 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-900"
          required
        >
          <option value="" disabled>
            Selecciona una zona
          </option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.custom_name || z.default_name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <label
          htmlFor="box-name"
          className="block mb-2 text-sm font-medium text-neutral-700"
        >
          Nombre de la caja
        </label>
        <input
          id="box-name"
          type="text"
          placeholder="Nombre de la caja"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          className="w-full border border-neutral-700 text-neutral-600 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-900"
          required
        />

        <label
          htmlFor="box-desc"
          className="block mb-2 text-sm font-medium text-neutral-700"
        >
          Descripción (opcional)
        </label>
        <textarea
          id="box-desc"
          placeholder="Descripción"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          className="w-full border border-neutral-700 text-neutral-600 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-900"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-neutral-600 hover:bg-gray-800 hover:text-white cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-rose-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-rose-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoxesModal;
