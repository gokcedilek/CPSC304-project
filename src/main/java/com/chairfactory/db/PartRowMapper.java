package com.chairfactory.db;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PartRowMapper implements RowMapper<Part> {

    @Override
    public Part mapRow(ResultSet rs, int rowNum) throws SQLException {
        Part part = new Part();

        part.setPart_name(rs.getString("name"));

        return part;
    }
}
