package com.example.backend;

import com.example.backend.model.MaterialQuantity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class BOMRequest {
    private Long productId;
    private MaterialQuantityDTO[] materials;
}
