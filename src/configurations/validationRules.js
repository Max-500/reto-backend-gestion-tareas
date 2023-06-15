import { check } from "express-validator";


const validateCreateTask = [
    check("title", "Ingresa un titulo valido de minimo 5 caracteres").exists().isLength({ min:5, max:50 }),
    check("description", "Ingresa una descripcion minimo de 20 caracteres").exists().isLength({ min:5 }),
    check("status", "Ingresa una de las siguiente opciones: En Progreso ó Terminada").isIn(["En Progreso", "Terminada"]).exists(),
    check("effective_date", "Ingresa una fecha correcta con el formato YYYY-MM-DD").isISO8601().exists(),
    check("responsible", "Ingresa un encargado para la tarea").exists().isLength({ min: 3 })
];

const validateGetTask = [
    check("taskId", "Ingresa un número").exists().isInt()
]

const updateTask = [
    check("taskId", "Ingresa un número").exists().isInt(),
    check("title", "Ingresa un titulo valido de minimo 5 caracteres").exists().isLength({ min:5, max:50 }),
    check("description", "Ingresa una descripcion minimo de 20 caracteres").exists().isLength({ min:5 }),
    check("status", "Ingresa una de las siguiente opciones: En Progreso ó Terminada").isIn(["En Progreso", "Terminada"]).exists(),
    check("effective_date", "Ingresa una fecha correcta con el formato YYYY-MM-DD").isISO8601().exists(),
    check("responsible", "Ingresa un encargado para la tarea").exists().isLength({ min: 3 })
]

export { validateCreateTask, validateGetTask, updateTask }