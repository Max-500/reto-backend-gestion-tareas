import { getTaskTagService, createTaskTagService, updateTaskTagService } from "../services/tagService.js"

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

export { getTaskTag, createTaskTag, editTaskTag }