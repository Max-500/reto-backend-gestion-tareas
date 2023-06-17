import { getTaskTagService, createTaskTagService, updateTaskTagService } from "../services/tagService.js"

// Controlador que trae todas las etiquetas de una tarea en especifico
const getTaskTag = async(taskId) => {
    let getTags = await getTaskTagService(taskId);
    switch (getTags["status"]) {
      case "Ok":
        delete getTags["status"]
        return JSON.parse(getTags["tags"]["dataValues"]["tag"])

      case "Not Found":
        delete getTags["status"]
        return getTags

      default:
        return {
          status: "Internal Server Error",
          message: "Algo malo sucedio en el servidor",
        };
    }
}

// Controlador que crea etiquetas a una tarea en especifico
const createTaskTag = async(taksId, tagArray) => {
    let newTag = await createTaskTagService(taksId, tagArray);
    switch (newTag["status"]) {
        case "Created":
            delete newTag["status"]
          return {
            tag: newTag["tag"]["dataValues"],
            message: newTag["message"]
          };
  
        case "Bad Request":
            delete newTag["status"]
          return newTag;
  
        case "Not Found":
            delete newTag["status"]
            return {
                tag: newTag["tag"]["dataValues"],
                message: newTag["message"]
              };
  
        default:
          return {
            status: "Internal Server Error",
            message: "Algo malo sucedio en el servidor",
          };
      }
}

// Controlador que permite editar una tag de una tarea en especifico
const editTaskTag = async(taksId, tagData) => {
    let updateTag = await updateTaskTagService(taksId, tagData)

    switch (updateTag["status"]) {
        case "Ok":
          return updateTag
  
        case "Bad Request":
          return updateTag
  
        case "Not Modified":
          return updateTag
  
        default:
          return res.status(500).json({
            status: "Internal Server Error",
            message: "Algo malo sucedio en el servidor",
          });
      }
}

// Exportaciones de todos los controladores de las tags
export { getTaskTag, createTaskTag, editTaskTag }