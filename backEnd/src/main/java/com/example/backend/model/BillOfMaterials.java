package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BillOfMaterials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Product finishedProduct;

    @OneToMany
    private List<Product> materials;

    public BillOfMaterials(Product finishedProduct, List<Product> materials) {
        this.finishedProduct = finishedProduct;
        this.materials = materials;
    }
}

