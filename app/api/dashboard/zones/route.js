import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import pool from "@/lib/db";

const JWT_TOKEN = process.env.JWT_TOKEN;

export async function POST(req) {
  const header = req.headers.get("cookie") || "";
  const { token } = cookie.parse(header);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Token invalido" },
      { status: 401 }
    );
  }

  const { zoneId, customName } = await req.json();
  if (!zoneId) {
    return NextResponse.json(
      { success: false, error: "No se encontro el ID" },
      { status: 400 }
    );
  }

  try {
    const existing = await pool.query(
      `SELECT id FROM user_zones WHERE user_id = $1 AND zone_id = $2`,
      [payload.userId, zoneId]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: "La zona ya esta creada" },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO user_zones (user_id, zone_id, custom_name)
       VALUES ($1, $2, $3)
       RETURNING id, zone_id, custom_name`,
      [payload.userId, zoneId, customName || null]
    );

    const userZone = result.rows[0];

    return NextResponse.json({ success: true, userZone }, { status: 201 });
  } catch (err) {
    console.error("Error al insertar en la DB:", err);
    return NextResponse.json(
      { success: false, error: "Error de servidor" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const header = req.headers.get("cookie") || "";
  const { token } = cookie.parse(header);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch {
    return NextResponse.json(
      { success: false, error: "Token invalido" },
      { status: 401 }
    );
  }

  try {
    const result = await pool.query(
      `SELECT uz.id, uz.custom_name, z.id AS zone_id, z.name AS default_name
       FROM user_zones uz
       JOIN zones z ON uz.zone_id = z.id
       WHERE uz.user_id = $1
       ORDER BY uz.id DESC`,
      [payload.userId]
    );
    return NextResponse.json(
      { success: true, userZones: result.rows },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error al obtener listado:", err);
    return NextResponse.json(
      { success: false, error: "Error de servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const header = req.headers.get("cookie") || "";
  const { token } = cookie.parse(header);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch {
    return NextResponse.json(
      { success: false, error: "Token inválido" },
      { status: 401 }
    );
  }

  const { userZoneId } = await req.json();
  if (!userZoneId) {
    return NextResponse.json(
      { success: false, error: "Falta el ID de la zona del usuario" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `DELETE FROM user_zones
         WHERE id = $1 AND user_id = $2
         RETURNING id`,
      [userZoneId, payload.userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Zona no encontrada o no pertenece al usuario",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Zona eliminada correctamente" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error eliminando zona del usuario:", err);
    return NextResponse.json(
      { success: false, error: "Error de servidor" },
      { status: 500 }
    );
  }
}
