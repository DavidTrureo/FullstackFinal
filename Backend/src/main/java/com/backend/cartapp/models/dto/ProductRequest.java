package com.backend.cartapp.models.dto;

public class ProductRequest {
    private String name;
    private String description;
    private Double price;

    // Getters y setters
    public String getName(){ return name; }
    public void setName(String n){ this.name = n; }

    public String getDescription(){ return description; }
    public void setDescription(String d){ this.description = d; }

    public Double getPrice(){ return price; }
    public void setPrice(Double p){ this.price = p; }
}