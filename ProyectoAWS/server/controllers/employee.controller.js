const employeeCtrl = {};
const Employee = require('../models/employee')


employeeCtrl.getEmployees = async (req, res) => {
    // res.send("Hello World");
    // res.json({
    //     status: "Employees goes here"
    // })
    const employees = await Employee.find();
    res.json(employees);

}

employeeCtrl.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

employeeCtrl.createEmployee = async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.position,
        salary: req.body.salary
    });
    await employee.save();
    res.json({
        'status': 'Employee Saved'
    });
}

employeeCtrl.editEmployee = async (req, res) => {
    const {id} = req.params;
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    await Employee.findByIdAndUpdate(id, {$set: employee}, {new: true});
    res.json({status: "Employee Updated"});

}

employeeCtrl.deleteEmployee = async (req, res) => {
    const {id} = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({status: "Employee Deleted"});
}

module.exports = employeeCtrl;