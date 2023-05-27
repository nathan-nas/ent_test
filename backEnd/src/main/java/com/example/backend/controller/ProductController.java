package com.example.backend.controller;

import com.example.backend.model.Product;
import com.example.backend.repo.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {
    @Autowired
    ProductRepository productRepository;
    @GetMapping(path="{id}")
    public Product getProductById(@PathVariable("id") Long id){
        return productRepository.findById(id).get();
    }
    @GetMapping(path = "")
    public List<Product> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category
    ) {
        if (name != null && !name.isEmpty() && category != null && !category.isEmpty()) {
            // Perform search by both name and category
            return productRepository.findByNameContainingIgnoreCaseAndCategoryIgnoreCase(name, category);
        } else if (name != null && !name.isEmpty()) {
            // Perform search by name
            return productRepository.findByNameContainingIgnoreCase(name);
        } else if (category != null && !category.isEmpty()) {
            // Perform search by category
            return productRepository.findByCategoryIgnoreCase(category);
        } else {
            // Return all products if no filter is applied
            return productRepository.findAll();
        }
    }

    @PostMapping(path = "")
    public Product addProduct(@RequestBody Product product){
        return productRepository.save(product);
    };

    @DeleteMapping(path = "{id}")
    public void deleteProduct(@PathVariable("id") Long id){
        productRepository.deleteById(id);
    }
}
