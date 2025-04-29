import {
    Bed,
    Bath,
    Utensils,
    Sofa,
    UtensilsCrossed,
    WashingMachine,
    Laptop,
    Warehouse,
    DoorOpen,
    Box,
  } from "lucide-react";
  import React from "react";
  
  export interface ZoneTemplate {
    id: number;
    name: string;
    icon: React.ReactNode;
  }
  
  export const predefinedZones: ZoneTemplate[] = [
    { id: 1, name: "Dormitorio", icon: <Bed size={20} /> },
    { id: 2, name: "Baño", icon: <Bath size={20} /> },
    { id: 3, name: "Cocina", icon: <Utensils size={20} /> },
    { id: 4, name: "Sala de estar / Living", icon: <Sofa size={20} /> },
    { id: 5, name: "Comedor", icon: <UtensilsCrossed size={20} /> },
    { id: 6, name: "Lavadero", icon: <WashingMachine size={20} /> },
    { id: 7, name: "Oficina / Estudio", icon: <Laptop size={20} /> },
    { id: 8, name: "Garaje", icon: <Warehouse size={20} /> },
    { id: 9, name: "Hall de entrada", icon: <DoorOpen size={20} /> },
    { id: 10, name: "Otros", icon: <Box size={20} /> },
  ];
  