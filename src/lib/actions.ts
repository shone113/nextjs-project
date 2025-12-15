"use server";
import { revalidatePath } from "next/cache";
import { Client } from "pg";
import { getClient } from "./db";
import type { Todo } from "./types";

export async function getTodos(): Promise<Todo[]> {
  const client = getClient();
  await client.connect();

  try {
    const result = await client.query("SELECT * FROM todos ORDER BY id DESC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching todos", error);
    return [];
  } finally {
    await client.end();
  }
  return [];
}

export async function addTodo(text: string): Promise<Todo | null> {
  const client = getClient();
  await client.connect();

  try {
    const result = await client.query(
      "INSERT INTO todos (text) VALUES ($1) RETURNING *",
      [text]
    );
    revalidatePath("/");
    return result.rows[0];
  } finally {
    await client.end();
  }
}

export async function deleteTodo(id: number): Promise<boolean> {
  const client = getClient();
  await client.connect();

  try {
    await client.query("DELETE FROM todos WHERE id = $1", [id]);
    revalidatePath("/");
    return true;
  } catch (error) {
    console.log("Error deleting task", error);
    return false;
  } finally {
    await client.end();
  }
}

export async function toggleTodo(id: number): Promise<Todo | null> {
  const client = getClient();
  await client.connect();

  try {
    const result = await client.query(
      "UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *",
      [id]
    );
    revalidatePath("/");
    return result.rows[0];
  } catch (error) {
    console.error("Error toggling todo", error);
    return null;
  } finally {
    await client.end();
  }
}
