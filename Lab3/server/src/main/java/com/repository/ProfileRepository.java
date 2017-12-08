package com.repository;

import com.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface ProfileRepository extends JpaRepository<User, Long> {
    User findById(int userId);
}