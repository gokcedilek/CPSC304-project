package com.chairfactory.db;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationRowMapper implements RowMapper<Location>{

    @Override
    public Location mapRow(ResultSet rs, int rowNum) throws SQLException {
        Location location = new Location();

        location.setCountry(rs.getString("country"));
        location.setCity(rs.getString("city"));

        return location;
    }
}
