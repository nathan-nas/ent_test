package com.example.backend.repo;

import com.example.backend.model.MaterialQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialQuantityRepository extends JpaRepository<MaterialQuantity, Long> {
    public void deleteByProductId(Long id);
}
