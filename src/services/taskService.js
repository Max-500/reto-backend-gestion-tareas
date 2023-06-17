import { createTaskTag, editTaskTag, getTaskTag } from "../controllers/tagController.js";
import Task from "../database/models/Task.js";
import { getAllTaskCommentService } from "./commentService.js";

// Servicio que trae informacion breve sin comentarios y etiquetas de todas las tareas
const getAllTaskService = async () => {
  let result = await Task.findAll().catch((error) => {
    console.error(error);
  });

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde",
    };
  }

  if (!result.length) {
    return {
      status: "No Content",
      message: "Actualmente no hay ninguna tarea",
    };
  }

  return {
    status: "Ok",
    data: result,
  };
};

// Servicio que trae toda la informacion de una tarea en especifico (tambien trae los comentarios y tags de esa tarea)
const getTaskService = async (taskId) => {
  let result = await Task.findByPk(taskId).catch((error) => {
    console.error(error);
  });

  if (!result) {
    return {
      status: "Not Found",
      message: "El recurso solicitado no existe",
    };
  }

  let tag = await getTags(taskId)
  result["dataValues"]["Tags"] = tag;

  let getComments = await getComment(taskId);
  delete getComments["status"]
  result["dataValues"]["Comments"] = getComments["comments"];

  return {
    status: "Ok",
    data: result,
  };
};

// Servicio que permite crear una tarea
const createTaskService = async (cratedTaskData, tagArray) => {
  let result = await Task.create(cratedTaskData).catch((error) => {
    console.error(error);
  });

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "El recurso solicitado no se pudo crear",
    };
  }

  let resultTag = await createTaskTag(result.dataValues["id"], tagArray);
  result["dataValues"]["tags"] = resultTag;

  return {
    status: "Created",
    message: "El recurso solicitado se creo exitosamente",
    data: result,
  };
};

// Servicio que permite actualizar todo lo relacionado una tarea en especifico, por ende tambien las etiquetas de esa tarea
const updateTaskService = async (taskId, updatedTaskData, updatedTaskTagData) => {
  let result = await Task.update(updatedTaskData, {
    where: { id: taskId },
  }).catch((error) => console.error(error));

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde",
    };
  }
  
  let resultTag = await editTaskTag(taskId, updatedTaskTagData);
  if (result[0] !== 0 || resultTag["status"] !== "Not Modified") {
    return {
      status: "Ok",
      message: "El recurso se actualizo correctamente",
    };
  }

  return {
    status: "Not Modified",
    message: "El recurso solicitado no se actualizo",
  };

};

// Servicio que permite eliminar una tarea en especifico y lo relacionado esta, por ende tambien elimina las tags y comentarios de esta
const deleteTaskService = async (taksId) => {
  let result = await Task.destroy({
    where: { id: taksId },
  }).catch((error) => {
    console.error(error);
  });

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde",
    };
  }

  if (result === 0) {
    return {
      status: "Not Found",
      message: "El recurso solicitado no existe o no se pudo eliminar",
    };
  }

  return {
    status: "Ok",
    message: "El recurso fue eliminado correctamente",
  };
};

async function getTags(taskId){
  let tag = await getTaskTag(taskId);
  if(tag === []){
    return;
  }

  return tag;  
}

// Funcion que llama a un servicio de Comentarios que trae todos los comentarios de esa tarea en especifico
async function getComment(taskId) {
  return await getAllTaskCommentService(taskId);
}


export {
  getAllTaskService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
