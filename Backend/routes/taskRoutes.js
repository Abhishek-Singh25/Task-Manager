const express=require('express');
const router=express.Router();
const protect=require('../controllers/middleware');

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    toggleStatus
}=require('../controllers/tasks');

router.post('/',protect,createTask);
router.get('/',protect,getTasks);
router.put('/:id',protect,updateTask);
router.delete('/:id',protect,deleteTask);
router.patch('/:id/status',protect,toggleStatus);

module.exports=router;