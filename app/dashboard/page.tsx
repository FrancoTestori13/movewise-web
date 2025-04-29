"use client";
import React, { useState, useEffect } from "react";
import {
  CirclePlus,
  Search,
  Trash2,
  Package,
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  Edit,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ZoneModal from "./zonesmodal";
import BoxesModal from "./boxesmodal";
import ItemModal from "./itemsmodal";
import Toast from "../components/toast";
import { predefinedZones, ZoneTemplate } from "@/lib/zonetemplate";

interface Box {
  id: number;
  name: string;
  description: string;
  user_zone_id?: number;
}

interface Zone {
  id: number;
  zone_id: number;
  custom_name: string;
  default_name: string;
}

interface Item {
  id: number;
  name: string;
  quantity: number;
  box_id: number;
}

export default function Dashboard() {
  const router = useRouter();

  const [boxes, setBoxes] = useState<Box[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [showBoxModal, setShowBoxModal] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [expandedZones, setExpandedZones] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard", { credentials: "include" })
      .then((res) => {
        if (!res.ok) router.replace("/");
      })
      .catch(() => {});
  }, [router]);

  useEffect(() => {
    fetch("/api/dashboard/boxes", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBoxes(data.boxes);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error cargando cajas");
      });
  }, []);

  useEffect(() => {
    fetch("/api/dashboard/zones", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setZones(data.userZones);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error cargando zonas");
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/dashboard/logout", { method: "POST" });
    router.replace("/");
  };

  const handleCreateZone = async (zoneId: number, customName: string) => {
    if (zones.some((z) => z.zone_id === zoneId)) {
      setMessage("Ya agregaste esta zona");
      return;
    }

    try {
      const res = await fetch("/api/dashboard/zones", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zoneId, customName }),
      });
      const data = await res.json();
      if (data.success && data.userZone) {
        setZones((prev) => [data.userZone, ...prev]);
        setShowZoneModal(false);
        setMessage("");
      } else {
        setMessage(data.error || "Error al crear zona");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error creando zona");
    }
  };

  const handleCreateBox = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedZoneId) {
      setMessage("Selecciona una zona");
      return;
    }
    if (!name) {
      setMessage("Ingrese un nombre");
      return;
    }

    const res = await fetch("/api/dashboard/boxes", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        user_zone_id: selectedZoneId,
      }),
    });
    const data = await res.json();
    if (data.success && data.box) {
      setBoxes((prev) => [data.box, ...prev]);
      setName("");
      setDescription("");
      setMessage("");
      setShowBoxModal(false);
    } else {
      setMessage(data.error || "Error al crear caja");
    }
  };

  const toggleZone = (id: number) =>
    setExpandedZones((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleBoxClick = (box: Box) => {
    setSelectedBox(box);
    setSelectAll(false);
    setSelectedItems({});

    fetch(`/api/dashboard/items?box_id=${box.id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setItems(data.objects);
        else setItems([]);
      })
      .catch(() => setItems([]));
  };

  const getZoneName = (zoneId: number | undefined) => {
    if (!zoneId) return "";
    const zone = zones.find((z) => z.id === zoneId);
    return zone ? zone.custom_name || zone.default_name : "";
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedItems: { [key: number]: boolean } = {};
    items.forEach((obj) => {
      newSelectedItems[obj.id] = newSelectAll;
    });
    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (id: number) => {
    const newSelectedItems = { ...selectedItems };
    newSelectedItems[id] = !selectedItems[id];
    setSelectedItems(newSelectedItems);

    const allSelected = items.every((obj) => newSelectedItems[obj.id]);
    setSelectAll(allSelected);
  };

  return (
    <div className="flex h-screen">
      <aside className="bg-sky-900 w-20 flex flex-col justify-between items-center py-6">
        <div className="flex flex-col items-center gap-8">
          <Link href="/">
            <img
              src="/logowhite.png"
              alt="MoveWise Logo"
              className="h-11 w-auto cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-6 text-white text-2xl">
          <Settings size={24} />
          <button
            onClick={handleLogout}
            title="Salir"
            className="cursor-pointer"
          >
            <LogOut size={24} />
          </button>
        </div>
      </aside>

      <aside className="bg-gray-100 w-64 p-6 flex flex-col justify-between">
        <div>
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-700"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-neutral-700 focus:outline-none"
              aria-label="Buscar"
            />
          </div>
          <hr className="border-neutral-700 mb-4" />

          <button
            onClick={() => setShowZoneModal(true)}
            className="flex items-center text-neutral-600 gap-2 font-medium hover:text-sky-900 transition mb-2 cursor-pointer"
          >
            <CirclePlus size={20} /> Añadir zona
          </button>
          <button
            onClick={() => setShowBoxModal(true)}
            className="flex items-center text-neutral-600 gap-2 font-medium hover:text-sky-900 transition cursor-pointer"
          >
            <CirclePlus size={20} /> Añadir caja
          </button>

          <div className="mt-6 overflow-y-auto max-h-[400px] custom-scrollbar">
            {zones.map((zone) => {
              const isExpanded = !!expandedZones[zone.id];

              const template: ZoneTemplate | undefined = predefinedZones.find(
                (t) => t.id === zone.zone_id
              );

              return (
                <div key={zone.id} className="mb-2">
                  <div
                    className="group flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-sky-900"
                    onClick={() => toggleZone(zone.id)}
                  >
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}

                    {template && (
                      <span className="group-hover:text-sky-900">
                        {template.icon}
                      </span>
                    )}
                    <span className="font-medium">
                      {zone.custom_name || zone.default_name}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="pl-6 mt-1">
                      {boxes
                        .filter((b) => b.user_zone_id === zone.id)
                        .map((b) => (
                          <div
                            key={b.id}
                            className="flex items-center gap-2 mb-1 text-neutral-600 cursor-pointer hover:text-sky-900"
                            onClick={() => handleBoxClick(b)}
                          >
                            <Package size={20} />
                            <span>{b.name}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button className="flex items-center text-neutral-600 gap-2 font-medium hover:text-sky-900 transition">
          <Trash2 size={20} /> Ver papelera
        </button>
      </aside>
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

      <main className="flex-1 p-6 bg-white relative">
        {showBoxModal && (
          <BoxesModal
            zones={zones}
            zoneId={selectedZoneId}
            onChangeZone={setSelectedZoneId}
            name={name}
            description={description}
            error={message}
            onChangeName={setName}
            onChangeDescription={setDescription}
            onClose={() => setShowBoxModal(false)}
            onSubmit={handleCreateBox}
          />
        )}

        {showZoneModal && (
          <ZoneModal
            onClose={() => setShowZoneModal(false)}
            onSave={handleCreateZone}
          />
        )}

        {selectedBox && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-neutral-700 text-xl">
                {getZoneName(selectedBox.user_zone_id)} / {selectedBox.name}
              </div>
              <button
                onClick={() => setShowItemModal(true)}
                className="bg-rose-600 text-white px-6 py-3 text-1xl rounded-lg hover:bg-rose-700 text-sm cursor-pointer"
              >
                + Agregar objeto
              </button>
            </div>

            <div className="border rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between bg-gray-600 text-white px-4 py-2 -m-4 mb-4 rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <input
                      id="select-all-checkbox"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="h-9 w-4"
                      aria-label="Seleccionar todo"
                    />
                    <label
                      htmlFor="select-all-checkbox"
                      className="text-sm text-white font-medium ml-2 cursor-pointer hover:text-gray-200"
                    >
                      Seleccionar todo
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center text-sm text-white hover:text-gray-200 gap-1 cursor-pointer">
                    <Edit size={16} /> Editar
                  </button>
                  <button className="flex items-center text-sm text-white hover:text-gray-200 gap-1 cursor-pointer">
                    <Download size={16} /> Exportar
                  </button>
                  <button className="flex items-center text-sm text-white hover:text-gray-200 gap-1 cursor-pointer">
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-6">
                {items.map((obj) => (
                  <div key={obj.id} className="flex items-center gap-4">
                    <input
                      id={`object-${obj.id}`}
                      checked={!!selectedItems[obj.id]}
                      onChange={() => handleSelectItem(obj.id)}
                      type="checkbox"
                      className="h-4 w-4"
                      aria-label={`Seleccionar ${obj.name}`}
                    />
                    <div className="flex-1 flex items-center">
                      <label
                        htmlFor={`object-${obj.id}`}
                        className="flex-1 text-neutral-700 cursor-pointer"
                      >
                        {obj.name}
                      </label>
                      <span className="text-neutral-500 min-w-[40px] text-right">
                        x{obj.quantity}
                      </span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="text-neutral-400 text-sm text-center py-4">
                    No hay objetos en esta caja.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {showItemModal && selectedBox && (
          <ItemModal
            boxId={selectedBox.id}
            onClose={() => setShowItemModal(false)}
            onItemAdded={() => handleBoxClick(selectedBox)}
          />
        )}
      </main>
      <Toast message={message} clearMessage={() => setMessage("")} />
    </div>
  );
}
