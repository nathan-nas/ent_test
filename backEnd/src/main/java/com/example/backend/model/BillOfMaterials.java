package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BillOfMaterials {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bill_of_materials_seq")
    @SequenceGenerator(name = "bill_of_materials_seq", sequenceName = "bill_of_materials_seq", allocationSize = 1)
    private Long id;

    @OneToOne
    private Product finishedProduct;

    @OneToMany
    private List<MaterialQuantity> materials = new ArrayList<>();

    public void add(MaterialQuantity materialQuantity) {
        materials.add(materialQuantity);
    }
}
