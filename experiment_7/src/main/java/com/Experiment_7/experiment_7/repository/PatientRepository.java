package com.Experiment_7.experiment_7.repository;

import com.Experiment_7.experiment_7.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}