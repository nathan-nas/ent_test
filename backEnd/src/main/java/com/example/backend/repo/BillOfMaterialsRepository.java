package com.example.backend.repo;

import com.example.backend.model.BillOfMaterials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BillOfMaterialsRepository extends JpaRepository<BillOfMaterials, Long> {
    public Optional<BillOfMaterials> findByFinishedProductId(Long id);
    public void deleteByFinishedProductId(Long id);
}
