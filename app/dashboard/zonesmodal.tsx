import React, { useState } from "react";
import { predefinedZones, ZoneTemplate } from "@/lib/zonetemplate";

interface ZoneModalProps {
  onClose: () => void;
  onSave: (zoneId: number, customName: string) => void;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ onClose, onSave }) => {
  const [selectedZone, setSelectedZone] = useState<ZoneTemplate | null>(null);
  const [customName, setCustomName] = useState("");

  const handleZoneSelect = (zone: ZoneTemplate) => {
    setSelectedZone(zone);
    setCustomName(zone.name);
  };

  const handleSave = () => {
    if (!selectedZone || customName.trim() === "") return;
    onSave(selectedZone.id, customName.trim());
    onClose();
  };

  return (
    <div
      className="absolute inset-0 bg-stone-900/20 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-stone-100 p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-sky-900 text-center font-bold mb-4">
          Añadir zona
        </h2>
        <hr className="border-neutral-700 mb-4" />

        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-4 mb-4 custom-scrollbar">
            {predefinedZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => handleZoneSelect(zone)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  selectedZone?.id === zone.id
                    ? "bg-sky-900 text-white"
                    : "bg-white text-neutral-700 hover:bg-gray-100"
                }`}
              >
                {zone.icon}
                <span>{zone.name}</span>
              </button>
            ))}
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 20px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.3);
          }
        `}</style>

        <h2 className="text-xl text-sky-900 text-center font-bold mb-4">
          Cambiar Nombre
        </h2>
        <input
          type="text"
          placeholder="Nombre de la zona"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
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
            type="button"
            onClick={handleSave}
            className="bg-rose-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-rose-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneModal;
