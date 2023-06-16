import Task from "../database/models/Task.js";

const getAllTaskService = async () => {
  let result = await Task.findAll().catch((error) => {
    console.error(error);
  });

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde"
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

const getTaskService = async (taskId) => {
  let result = await Task.findByPk(taskId).catch((error) => {
    console.error(error);
  });

  if (!result) {
    return {
      status: "Not Found",
      message: "El recurso solicitado no existe"
    };
  }

  return {
    status: "Ok",
    data: result,
  };
};

const createTaskService = async (cratedTaskData) => {
  let result = await Task.create(cratedTaskData).catch((error) => {
    console.error(error);
  });

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "El recurso solicitado no se pudo crear",
    };
  }

  return {
    status: "Created",
    message: "El recurso solicitado se creo exitosamente",
    data: result,
  };
};

const updateTaskService = async (taskId, updatedTaskData) => {
  let result = await Task.update(updatedTaskData, {
    where: { id: taskId },
  }).catch((error) => console.error(error));

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde"
    };
  }

  if (result[0] === 0) {
    return {
      status: "Not Modified",
      message: "El recurso solicitado no existe",
    };
  }

  return {
    status: "Ok",
    message: "El recurso se actualizo correctamente",
  };
};

const deleteTaskService = async (taksId) => {
  let result = await Task.destroy({
    where: { id: taksId },
  }).catch((error) => { console.error(error) })

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde"
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

export {
  getAllTaskService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};