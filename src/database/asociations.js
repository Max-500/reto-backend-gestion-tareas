// Importación de los modelos Task, Tag y Comment
import Task from "./models/Task.js";
import Tag from "./models/Tag.js";
import Comment from "./models/Comment.js";

// Importación de la conexion a la base de datos
import { db } from "./connection.js";

// Relación 1 a 1: Una Tarea tiene una Etiquetas(s)
Task.hasOne(Tag, {
  foreignKey: "task_id",
  allowNull: false,
});
Tag.belongsTo(Task, {
  foreignKey: "task_id",
  allowNull: false,
});

// Relación 1 a muchos: Una Tarea puede tener muchos Comentarios
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

// Sincronización de la base de datos (Creacion de nuestras tablas correctamente)
db.sync()
  .then(() => {
    console.log("Base de datos sincronizada correctamente");
  })
  .catch((error) => {
    console.log("Error al sincronizar la base de datos:", error);
  });
