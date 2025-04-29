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

  const {
    box_id,
    name,
    quantity = 1,
    description = "",
    tags = [],
  } = await req.json();

  if (!box_id || !name) {
    return NextResponse.json(
      { success: false, error: "Completar campos" },
      { status: 400 }
    );
  }

  try {
    const client = await pool.connect();
    await client.query("BEGIN");

    const itemResult = await client.query(
      `INSERT INTO items (box_id, name, quantity)
       VALUES ($1, $2, $3)
       RETURNING id, name, quantity, created_at, updated_at`,
      [box_id, name, quantity]
    );

    const newItem = itemResult.rows[0];

    if (tags.length > 0) {
      for (const tagName of tags) {
        const tagResult = await client.query(
          `INSERT INTO tags (name)
           VALUES ($1)
           ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
           RETURNING id`,
          [tagName.trim()]
        );

        const tagId = tagResult.rows[0].id;

        await client.query(
          `INSERT INTO item_tags (item_id, tag_id)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [newItem.id, tagId]
        );
      }
    }

    await client.query("COMMIT");
    client.release();

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
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

  const { searchParams } = new URL(req.url);
  const boxId = searchParams.get("box_id");

  if (!boxId) {
    return NextResponse.json(
      { success: false, error: "No se encontro el ID" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `SELECT id, name, quantity, box_id, created_at, updated_at
         FROM items
         WHERE box_id = $1`,
      [boxId]
    );

    return NextResponse.json(
      { success: true, objects: result.rows },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error al obetener listado:", err);
    return NextResponse.json(
      { success: false, error: "Error de servidor" },
      { status: 500 }
    );
  }
}
