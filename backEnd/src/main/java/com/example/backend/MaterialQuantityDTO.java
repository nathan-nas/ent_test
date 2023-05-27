package com.example.backend;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class MaterialQuantityDTO {
    private Long id;
    private int quantity;
}
