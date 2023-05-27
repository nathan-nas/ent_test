package com.example.backend.controller;

import com.example.backend.BOMRequest;
import com.example.backend.MaterialQuantityDTO;
import com.example.backend.model.BillOfMaterials;
import com.example.backend.model.MaterialQuantity;
import com.example.backend.model.Product;
import com.example.backend.repo.BillOfMaterialsRepository;
import com.example.backend.repo.MaterialQuantityRepository;
import com.example.backend.repo.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/bom")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BOMController {
    @Autowired
    BillOfMaterialsRepository billOfMaterialsRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    MaterialQuantityRepository materialQuantityRepository;

    @GetMapping(path="{id}")
    public BillOfMaterials getBOM(@PathVariable("id") Long id) {
        return billOfMaterialsRepository.findByFinishedProductId(id).orElse(null);
    }

    @PostMapping
    public void addBOM(@RequestBody BOMRequest request) {
        Long productId = request.getProductId();
        BillOfMaterials bom = billOfMaterialsRepository.findByFinishedProductId(productId).orElse(null);

        if (bom == null) {
            // BillOfMaterials does not exist, create a new one
            bom = new BillOfMaterials();
            Product finishedProduct = productRepository.findById(productId).orElse(null);
            bom.setFinishedProduct(finishedProduct);
        }

        // Create a list to hold the MaterialQuantity objects
        List<MaterialQuantity> materialQuantities = new ArrayList<>();

        // Add materials to the BillOfMaterials
        for (MaterialQuantityDTO dto : request.getMaterials()) {
            Product material = productRepository.findById(dto.getId()).orElse(null);
            if (material != null) {
                MaterialQuantity materialQuantity = new MaterialQuantity(material, dto.getQuantity());
                materialQuantities.add(materialQuantity);
                bom.add(materialQuantity);
            }
        }

        // Save all the MaterialQuantity objects in bulk
        materialQuantityRepository.saveAll(materialQuantities);

        // Save the BillOfMaterials
        billOfMaterialsRepository.save(bom);
    }
}
