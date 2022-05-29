package com.myar.content.manager.entities.request.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoordinatesPostRequest {

    public BigDecimal latitude;
    public BigDecimal longitude;
}
