"use client";
import React, { useState } from "react";

interface ItemModalProps {
  boxId: number;
  onClose: () => void;
  onItemAdded: () => void;
}

export default function ItemModal({ boxId, onClose, onItemAdded }: ItemModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setMessage("El nombre es obligatorio");
      return;
    }

    const res = await fetch("/api/dashboard/items", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ box_id: boxId, name, quantity, tags }),
    });

    const data = await res.json();
    if (data.success) {
      onItemAdded();
      onClose();
    } else {
      setMessage(data.error || "Error al agregar ítem");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50"
    onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md" 
      onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl text-sky-900 mb-4">Agregar Ítem</h2>
        {message && <p className="text-red-600 mb-2">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-3 px-3 py-2 border rounded text-gray-600"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full mb-3 px-3 py-2 border rounded text-gray-600"
            type="number"
            min={1}
            placeholder="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />  
        
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded cursor-pointer text-neutral-600 hover:bg-gray-800 hover:text-white">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded cursor-pointer hover:bg-rose-700">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
