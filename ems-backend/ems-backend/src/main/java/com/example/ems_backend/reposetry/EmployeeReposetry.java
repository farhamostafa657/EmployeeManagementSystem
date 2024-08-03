package com.example.ems_backend.reposetry;

import com.example.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeReposetry extends JpaRepository<Employee,Long> {
}
