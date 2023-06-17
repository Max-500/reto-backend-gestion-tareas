// Importación de check que viene de express-validator
import { check } from "express-validator";

// Regla para verificar que venga el id de la tarea
const validateGetTask = [
    check("taskId", "Ingresa un número").exists().isInt()
]

// Regla para la validación de que venga todos los datos necesarios para la creación de la tarea
const validateCreateTask = [
    check("title", "Ingresa un titulo valido de minimo 5 caracteres").exists().isLength({ min:5, max:50 }),
    check("description", "Ingresa una descripcion minimo de 20 caracteres").exists().isLength({ min:5 }),
    check("status", "Ingresa una de las siguiente opciones: En Progreso ó Terminada").isIn(["En Progreso", "Terminada"]).exists(),
    check("effective_date", "Ingresa una fecha correcta con el formato YYYY-MM-DD").isISO8601().exists(),
    check("responsible", "Ingresa un encargado para la tarea").exists().isLength({ min: 3 }),
    check("tags", "Ingresa minimamente un arreglo vacio").exists().isArray()
];

// Regla para la validación de que venga todos los datos necesarios para la actualizacioón de una tarea
const updateTask = [
    check("taskId", "Ingresa un número").exists().isInt(),
    check("title", "Ingresa un titulo valido de minimo 5 caracteres").exists().isLength({ min:5, max:50 }),
    check("description", "Ingresa una descripcion minimo de 20 caracteres").exists().isLength({ min:5 }),
    check("status", "Ingresa una de las siguiente opciones: En Progreso ó Terminada").isIn(["En Progreso", "Terminada"]).exists(),
    check("effective_date", "Ingresa una fecha correcta con el formato YYYY-MM-DD").isISO8601().exists(),
    check("responsible", "Ingresa un encargado para la tarea").exists().isLength({ min: 3 }),
    check("tags", "Ingresa minimamente un arreglo vacio").exists().isArray()
]

// Regla para la validacion de que venga el id de la tarea y comentario
const validateGetTaskComment = [
    check("taskId", "Ingresa un número").exists().isInt(),
    check("commentId", "Ingresa un número").exists().isInt()
]

// Exportando todas las reglas de validación
export { validateCreateTask, validateGetTask, updateTask, validateGetTaskComment }