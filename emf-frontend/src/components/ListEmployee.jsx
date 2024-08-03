import React, { useEffect, useState } from "react";
import { deleteEmployee, listOfEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getALLEmployees();
  }, []);
  const navigate = useNavigate();
  function addNewEmployee() {
    navigate("/add-employee");
  }
  function getALLEmployees() {
    listOfEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`);
  }
  function removeEmployee(id) {
    console.log(id);
    deleteEmployee(id)
      .then((reponse) => {
        getALLEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="container">
      <h2 className="text-center">List Of Employees</h2>
      <button
        onClick={addNewEmployee}
        type="button"
        className="btn btn-primary mb-2"
      >
        Add Employee
      </button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-dark"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger "
                  onClick={() => removeEmployee(employee.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
