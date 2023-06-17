import Tag from "../database/models/Tag.js"

const getTaskTagService = async(taskId) => {
    let result = await Tag.findOne({
        where: {
            task_id: taskId
        }
    }).catch((error) => { console.error(error) })

    if (result === undefined) {
        return {
          status: "Bad Request",
          message: "Algo malo sucedio con el servicio, intentalo mas tarde",
        };
      }
    
      if (result === null) {
        return {
          status: "Not Found"
        };
      }
    
      return {
        status: "Ok",
        tags: result,
      };
}

const createTaskTagService = async(taskId, tagArray) => {
    let tagJson = {
        tag: JSON.stringify(tagArray),
        task_id: taskId
    }

    let result = await Tag.create(tagJson).catch((error) => { console.error(error) })

    if(result === undefined){
        return {
            status: "Bad Request",
            message: "La(s) tag(s) no se pudieron crear"
        }
    }

    return {
        status: "Created",
        tag: result,
        message: "La(s) etiqueta(s) ha sido creado correctamente"
    }

}

const updateTaskTagService = async(taskId, updateTagData) => {
    let newTag = {
        tag: JSON.stringify(updateTagData)
    }
    let result = await Tag.update(newTag, {
        where: {
            task_id: taskId
        }
    }).catch((error) => { console.error(error) })

    if (result === undefined) {
        return {
          status: "Bad Request",
          message: "Algo malo sucedio con el servicio, intentalo mas tarde",
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
}

export { getTaskTagService, createTaskTagService, updateTaskTagService }