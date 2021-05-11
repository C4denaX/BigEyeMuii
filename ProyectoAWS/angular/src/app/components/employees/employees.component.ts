import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { 
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  addEmployee(form: NgForm) {
    if(form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(
          res => {
            this.resetForm(form);
            alert("El empleado se ha actualizado.");
            this.getEmployees();
          },
          error => {
            console.log(error);
          }
        )
    } else {
      this.employeeService.postEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        alert("El empleado ha sido guardado.");
        this.getEmployees();
      })
    }
  }


  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
      });
  }

  editEmployee(em: Employee) {
    this.employeeService.selectedEmployee = em;
  }

  deleteEmployee(em: Employee) {
    this.employeeService.deleteEmployee(em)
      .subscribe
        (res => {
          alert("El empleado " + em.name + " ha sido eliminado.");
          this.getEmployees();
        },
        error => {
          console.log(error);
        });
  }

}
