package com.chairfactory.db;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

//NOTE: for rowmapper to work, the Order class needs to have either public fields, or getter setters!

public class OrderRowMapper implements RowMapper<Order> {

    @Override
    public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
        Order order = new Order();

        order.setId(rs.getInt("id"));
        order.setQuantity(rs.getInt("quantity"));
        order.setBlueprint_size(rs.getString("blueprint_size"));
        order.setPurchaser_username(rs.getString("purchaser_username"));

        return order;
    }
}
