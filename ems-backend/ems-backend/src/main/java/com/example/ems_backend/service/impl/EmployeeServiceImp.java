package com.example.ems_backend.service.impl;

import com.example.ems_backend.dto.EmployeeDto;
import com.example.ems_backend.entity.Employee;
import com.example.ems_backend.exception.EmployeeNotFountException;
import com.example.ems_backend.mapper.EmployeeMapper;
import com.example.ems_backend.reposetry.EmployeeReposetry;
import com.example.ems_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImp implements EmployeeService {
    // inject EmployeeReposetry
    private EmployeeReposetry employeeReposetry;

    @Autowired
    public EmployeeServiceImp(EmployeeReposetry employeeReposetry) {

        this.employeeReposetry = employeeReposetry;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=employeeReposetry.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee=employeeReposetry.findById(employeeId).
                    orElseThrow(()->new EmployeeNotFountException("Employee is not exist with the given id"+employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees=employeeReposetry.findAll();
        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee=employeeReposetry.findById(employeeId).orElseThrow(
                ()->new EmployeeNotFountException("Employee is not exists with given id "+employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
       Employee updated1= employeeReposetry.save(employee);
       return EmployeeMapper.mapToEmployeeDto(updated1);

    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee= employeeReposetry.findById(employeeId).orElseThrow(
                ()-> new EmployeeNotFountException("Employee is not exits with given id"+employeeId)
        );
        employeeReposetry.deleteById(employeeId);
    }
}
