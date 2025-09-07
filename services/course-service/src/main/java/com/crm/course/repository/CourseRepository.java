package com.crm.course.repository;


import com.crm.course.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
List<Course> findByInstructorId(String instructorId);
}