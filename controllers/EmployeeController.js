const Employee = require('../models/Employee')
const { response } = require('../models/Employee')



const index = (req, res)=>{
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

const show = (req, res) =>{
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

const store = async (req, res) => {
    const { name, designation, email, phone, age } = req.body;
 
    // Check for duplicate email
    const isDuplicateEmail = await checkDuplicateEmail(email);
    if (isDuplicateEmail) {
      return res.json({
        message: 'Email already existed.try new email.'
      });
    }
 
    let employee = new Employee({
      name,
      designation,
      email,
      phone,
      age
    });
 
    employee.save()
      .then(response => {
        res.json({
          db: employee,
          message: 'Employee added successfully'
        });
      })
      .catch(error => {
        res.json({
          message: 'An error occurred'
        });
      });
  };

  async function checkDuplicateEmail(email) {
    const query = { 'email': { $regex: new RegExp(`^${email}$`, 'i') } };
    const existingEmail = await Employee.findOne(query);
    return !!existingEmail;
  }
 
  const update = async (req, res) => {
    try {
        let employeeID = req.body.employeeID;
 
        // Check for duplicate email
        const isDuplicateEmail = await checkDuplicateEmail(req.body.email, employeeID);
        if (isDuplicateEmail) {
            return res.json({
                message: 'Duplicate email. Employee not updated.'
            });
        }
 
        let updatedData = {
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
        };
 
        await Employee.findByIdAndUpdate(employeeID, { $set: updatedData });
        res.json({
            message: 'Employee updated successfully'
        });
    } catch (error) {
        res.json({
            message: 'An error occurred'
        });
    }
};

async function checkDuplicateEmail(email, currentEmployeeID) {
    const query = {
        email: { $regex: new RegExp(`^${email}$`, 'i') },
        _id: { $ne: currentEmployeeID } // Exclude the current employee ID from the check
    };
    const existingEmail = await Employee.findOne(query);
    return !!existingEmail;
}

const destroy = (req, res) => {
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