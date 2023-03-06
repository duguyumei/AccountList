package com.example.demo.dao;
/*
 ** @autor cc
 ** @date 2023/2/25
 */

import com.example.demo.common.CommonUtils;
import com.example.demo.common.JDBCUtils;
import com.example.demo.common.Result;
import com.example.demo.entity.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserDao {
    private final String TABLE_NAME = "user";

    public User getInfoById(String loginid) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        User info = null;
        StringBuilder sb = new StringBuilder();
        sb.append("select * from "+TABLE_NAME+" where rowguid='"+loginid+"' limit 1;");

        try {
            pst = conn.prepareStatement(sb.toString());

            rs = pst.executeQuery();
            while(rs.next()) {
                info = new User();
                CommonUtils.setValueByRs(info,rs);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return info;
    }

//    public Result getInfoByInfo(User info) {
////        Connection conn = JDBCUtils.getConnection();
////        PreparedStatement pst = null;
////        ResultSet rs = null;
////
////        User info = null;
////        StringBuilder sb = new StringBuilder();
////        sb.append("select * from "+TABLE_NAME+" where rowguid='"+loginid+"' limit 1;");
////
////        try {
////            pst = conn.prepareStatement(sb.toString());
////
////            rs = pst.executeQuery();
////            while(rs.next()) {
////                info = new User();
////                CommonUtils.setValueByRs(info,rs);
////            }
////        } catch (SQLException e) {
////            // TODO Auto-generated catch block
////            e.printStackTrace();
////        } finally{
////            JDBCUtils.closeConnection(conn, pst, rs);
////        }
////        return info;
////        if (n < 1){
////            return Result.error("404","未查找到该条数据");
////        }
//        return Result.success("修改成功");
//    }

    public Result editInfo(User info) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        int n = 0;
        List setList =  new ArrayList();
        Map<String,String> map = CommonUtils.getFieldValueMap(info);
        for (String str:map.keySet()){
            setList.add(str + "='" + map.get(str) + "' ");
        }
        String sql = "update "+TABLE_NAME+" SET "+ String.join(",",setList) +" where rowguid='"+info.getRowguid()+"' ;";

        try {
            pst = conn.prepareStatement(sql);
            n = pst.executeUpdate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        if (n < 1){
            return Result.error("404","未查找到该条数据");
        }
        return Result.success("修改成功");
    }
}
