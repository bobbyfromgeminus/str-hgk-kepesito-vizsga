const createError = require('http-errors');
const Model = require('../../models/building.model');
const service = require('./building.service');

exports.updateBuilding = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
     if (validationErrors) {
         return next(
             new createError.BadRequest(validationErrors)
         );
     }
 
     return service.update(req.params.id, req.body)
         .then(entity => {
             res.json(entity.id);
         })
         .catch(err => {
             console.error(err)
             return next(new createError.BadRequest('Missing data'));
         });
}


exports.getAllBuildingWithClassrooms = () => {
    return service.getAll()
         .then(list => {
             res.json(list);
         }).catch(err => {
             console.error(err);
             return new httpError.InternalServerError('List not sended')
         })
};