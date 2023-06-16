import Task from "../database/models/Task.js";
import Comment from "../database/models/Comment.js";

const getAllTaskCommentService = async (taskId) => {
  let result = await Comment.findAll({ where: { task_id: taskId } }).catch(
    (error) => {
      console.error(error);
    }
  );

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde",
    };
  }

  if (!result.length) {
    return {
      status: "No Content",
      data: `Actualmente la tarea con id ${taskId} no tiene ningun comentario`,
    };
  }

  return {
    status: "Ok",
    data: result,
  };
};

const getTaskCommentService = async (taskId, commentId) => {
  let result = await Comment.findOne({
    where: {
      id: commentId,
      task_id: taskId,
    },
  }).catch((error) => {
    console.error(error);
  });

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde",
    };
  }

  if (result === null) {
    return {
      status: "Not Found",
      message: "El recurso solicitado no existe",
    };
  }

  return {
    status: "Ok",
    data: result,
  };
};

const createTaskCommentService = async (taskId, commentData) => {
  let result = await Task.findByPk(taskId).catch((error) => {
    console.error(error);
  });

  if (!result) {
    return {
      status: "Not Found",
      message: "El comentario o tarea posiblemente ya fueron eliminados",
    };
  }

  commentData["task_id"] = taskId;

  let newCommentData = await Comment.create(commentData).catch((error) => {
    console.error(error);
  });

  if (newCommentData === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio en el servidor",
    };
  }

  return {
    status: "Created",
    message: "El recurso solicitado se creo exitosamente",
    data: newCommentData,
  };
};

const updateTaskCommentService = async (taskId, commentId, commentData) => {
    commentData['id'] = commentId
    commentData['task_id'] = taskId
  let result = await Comment.update(commentData, {
    where: {
      id: commentId,
      task_id: taskId,
    },
  }).catch((error) => {
    console.error(error);
  });

  console.log(result)

  if (result === undefined) {
    return {
      status: "Bad Request",
      message: "Algo malo sucedio con el servicio, intentalo mas tarde",
    };
  }

  if (result[0] === 0) {
    return {
      status: "Not Modified",
      message: "El recurso solicitado no se actualizo",
    };
  }

  return {
    status: "Ok",
    message: "El recurso se actualizo correctamente",
  };
};

const deleteTaskCommentService = async (taskId, commentId) => {
  let result = await Comment.destroy({
    where: {
      id: commentId,
      task_id: taskId,
    },
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

export {
  getAllTaskCommentService,
  getTaskCommentService,
  createTaskCommentService,
  updateTaskCommentService,
  deleteTaskCommentService,
};
