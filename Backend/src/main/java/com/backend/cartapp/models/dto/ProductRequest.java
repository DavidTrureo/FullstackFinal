package com.backend.cartapp.models.dto;

public class ProductRequest {
    private String name;
    private String description;
    private Long price;

    public String getName(){return name;}
    public void setName(String n){this.name=n;}

    public String getDescription(){return description;}
    public void setDescription(String d){this.description=d;}

    public Long getPrice(){return price;}
    public void setPrice(Long p){this.price=p;}
}
