package com.chairfactory.db;

public class Order {
    private int id;
    private int quantity;
    private String blueprint_size;
    private String purchaser_username;

    public int getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getBlueprint_size() {
        return blueprint_size;
    }

    public String getPurchaser_username() {
        return purchaser_username;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setBlueprint_size(String blueprint_size) {
        this.blueprint_size = blueprint_size;
    }

    public void setPurchaser_username(String purchaser_username) {
        this.purchaser_username = purchaser_username;
    }
}
