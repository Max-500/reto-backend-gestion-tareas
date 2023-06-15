import Task from "./models/Task.js";
import Tag from "./models/Tag.js";
import Comment from "./models/Comment.js";

import { db } from "./connection.js";

// Relaciones 1 a muchos

// 1 Tarea (Task) puede tener muchas Etiquetas (Tags)
Task.hasMany(Tag, {
  foreignKey: {
    name: "task_id",
    allowNull: false,
  },
});
Tag.belongsTo(Task, {
  foreignKey: {
    name: "task_id",
    allowNull: false,
  },
});

// 1 Tarea (Task) puede tener muchos Comentarios (Comments)
Task.hasMany(Comment, {
  foreignKey: {
    name: "task_id",
    allowNull: false,
  },
});
Comment.belongsTo(Task, {
  foreignKey: {
    name: "task_id",
    allowNull: false,
  },
});

db.sync()
  .then(() => {
    console.log("Base de datos sincronizada correctamente");
  })
  .catch((error) => {
    console.log("Error al sincronizar la base de datos:", error);
  });
