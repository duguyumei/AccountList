package com.example.demo.dao;
/*
 ** @autor cc
 ** @date 2023/2/17
 */

import com.example.demo.common.CommonUtils;
import com.example.demo.common.JDBCUtils;
import com.example.demo.entity.Ziduaninfo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ZiduanDao {
    private final String TABLE_NAME = "ziduan";

    public List<Ziduaninfo> getRiduanList(){
        Connection conn = JDBCUtils.getConnection();
        try {
            conn.setAutoCommit(false);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        PreparedStatement pst = null;
        ResultSet rs = null;

        List<Ziduaninfo> list = new ArrayList();
        try {
            String sql = "select * from " + TABLE_NAME;
            String where = " where 1=1 ";
            sql += where;
            sql += " order by update_time";
            pst = conn.prepareStatement(sql);

            rs = pst.executeQuery();
            while(rs.next()) {
                Ziduaninfo ziduan = new Ziduaninfo();
                CommonUtils.setValueByRs(ziduan,rs);
                list.add(ziduan);
            }
            conn.commit();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return list;
    }
}
