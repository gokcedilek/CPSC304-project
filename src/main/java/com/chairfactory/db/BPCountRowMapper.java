package com.chairfactory.db;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BPCountRowMapper implements RowMapper<BPCount>{

    @Override
    public BPCount mapRow(ResultSet rs, int rowNum) throws SQLException {
        BPCount bpcount = new BPCount();

        bpcount.setBlueprint_size(rs.getString("blueprint_size"));
        bpcount.setBp_count(rs.getInt("count"));

        return bpcount;
    }
}
