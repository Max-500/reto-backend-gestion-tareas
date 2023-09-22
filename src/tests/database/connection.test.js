import { db } from "../../database/connection.js"
import Task from "../../database/models/Task.js";
import Tag from "../../database/models/Tag.js";
import Comment from "../../database/models/Comment.js";

describe("Database Integration Tests", () => {
  beforeAll(async () => {
    // Sincronizar la base de datos antes de las pruebas
    await db.sync();
  });

  afterAll(async () => {
    // Cerrar la conexión con la base de datos después de las pruebas
    await db.close();
  });

  it("should create a Task and associated Tag", async () => {
    // Crear una instancia de Task y una instancia de Tag asociada
    const task = await Task.create({
      title: "11 Task",
      description: "This is a description",
      status: "En Progreso",
      responsible: "Max-500",
      effective_date: "2023/09/22"
    });

    let tagJson = {
        tag: JSON.stringify("Importante"),
        task_id: task.id
    }

    const _ = await Tag.create(tagJson)

    const tag = await Tag.findOne({ where: { task_id: 53 } });

    // Asegurarse de que la relación funcione
    expect(tag).toBeTruthy();
  });

  it("should create a Task and associated Comment", async () => {
    // Crear una instancia de Task y una instancia de Comment asociada
    const task = await Task.create({
        title: "12 Task",
        description: "This is a description",
        status: "En Progreso",
        responsible: "Max-500",
        effective_date: "2023/09/22"
    });

    const _ = await Comment.create({
        comment: "First Comment",
        user: "Max-500",
        task_id: task.id
    })

    const comment = await Comment.findOne({ where: { task_id: task.id } });

    // Asegurarse de que la relación funcione
    expect(comment).toBeTruthy();
  });

  it("should sync the database without errors", async () => {
    try {
      await db.sync();
    } catch (error) {
      // Si hay un error, la prueba fallará
      throw new Error("Error en la sincronización de la base de datos");
    }
  });
});
