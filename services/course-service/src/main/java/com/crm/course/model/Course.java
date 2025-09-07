package com.crm.course.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "courses")
public class Course {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


private String title;
private String description;
private String instructorId; // reference to user-service user id
private Double price = 0.0;


private LocalDateTime createdAt = LocalDateTime.now();
private LocalDateTime updatedAt = LocalDateTime.now();


// getters and setters


public Long getId() { return id; }
public void setId(Long id) { this.id = id; }


public String getTitle() { return title; }
public void setTitle(String title) { this.title = title; }


public String getDescription() { return description; }
public void setDescription(String description) { this.description = description; }


public String getInstructorId() { return instructorId; }
public void setInstructorId(String instructorId) { this.instructorId = instructorId; }


public Double getPrice() { return price; }
public void setPrice(Double price) { this.price = price; }


public LocalDateTime getCreatedAt() { return createdAt; }
public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }


public LocalDateTime getUpdatedAt() { return updatedAt; }
public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}