const Employee = require('../models/Employee')
const { response } = require('../models/Employee')



const index = (req, res, next)=>{
    Employee.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

const show = (req, res, next) =>{
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

const store = (req, res, next) => {
    let employee = new Employee({
        name:req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    })
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}


const update = (req,res,next) =>{
    let employeeId = req.body.employeeId({
        name:req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    })
    Employee.findByIdAndUpdate(employeeId, {$set: updatedData})
    .then(() =>{
       res.json({
        message: 'Employee updated successfully!'
       })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.deleteOne({ _id: employeeID })
    .then(() =>{
        res.json({
            message:'Employee deleted successfully'
        })
    })
    .catch(error => {
        console.log(error)
        res.json({
           
            message:'an error occured'
        })
    })
}
 
 
 
 
module.exports = {
    index, show, store, update, destroy
}