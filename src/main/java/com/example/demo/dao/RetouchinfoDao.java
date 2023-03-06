package com.example.demo.dao;
/*
 ** @autor cc
 ** @date 2023/2/16
 */

import com.example.demo.common.CommonUtils;
import com.example.demo.common.JDBCUtils;
import com.example.demo.common.Result;
import com.example.demo.entity.Retouchinfo;
import com.sun.deploy.util.StringUtils;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RetouchinfoDao {
    private final String TABLE_NAME = "retouchinfo";

    public Result addRetouch(Retouchinfo info){
        Connection conn = JDBCUtils.getConnection();
        try {
            conn.setAutoCommit(false);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        PreparedStatement pst = null;
        ResultSet rs = null;
        int result = 0;

        try {
            Map<String,List<String>> map = CommonUtils.getEnityParams(Retouchinfo.class);
            String rows = StringUtils.join(map.get("names4guid"),",");
            String params =  StringUtils.join(map.get("params4guid"),",");
            List<String> typeList = map.get("types4guid");
            String sql = "insert into " + TABLE_NAME
                    +" ( " + rows + " ) " + " values ( "+ params +" );";
            pst = conn.prepareStatement(sql);

            List valueList = new ArrayList();
            try {
                valueList = CommonUtils.getListValue(info, map.get("names4guid"));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
            for (int i = 0; i < valueList.size(); i++){
                if ("String".equals(typeList.get(i))){
                    pst.setString(i+1, String.valueOf(valueList.get(i)));
                }
                else if("Double".equals(typeList.get(i)) || "double".equals(typeList.get(i))){
                    pst.setDouble(i+1, (Double) valueList.get(i));
                }
                else if("Integer".equals(typeList.get(i)) || "int".equals(typeList.get(i))){
                    pst.setInt(i+1, (Integer) valueList.get(i));
                }
                else if ("Long".equalsIgnoreCase(typeList.get(i))) {
                    pst.setLong(i+1, (Long) valueList.get(i));
                }
                else if ("Boolean".equalsIgnoreCase(typeList.get(i))) {
                    pst.setBoolean(i+1, (Boolean) valueList.get(i));
                }
                else if ("Date".equals(typeList.get(i))) {
                    pst.setDate(i+1, (Date) valueList.get(i));
                }
                else {
                    throw new RuntimeException("运行错误！");
                }
            }
            result = pst.executeUpdate();
            conn.commit();
        } catch (SQLException e) {
            e.printStackTrace();
            if(rs!= null || pst!= null || conn != null)
            {
                //没有关闭进行回滚
                try {
                    conn.rollback();
                    conn.setAutoCommit(true);
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        if (result > 0){
            return Result.success("更新行数为："+result);
        }
        return Result.error("-1","添加失败");
    }

    public List<Retouchinfo> getList(Map<String, String> params, Integer pageIndex, Integer pageSize, String sortField, String sortOrder) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        List<Retouchinfo> list = new ArrayList<Retouchinfo>();
        List<Object> sortParams = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from "+TABLE_NAME+" where 1=1 ");
        if (!CommonUtils.isBlank(getFilter(params))){
            sb.append(getFilter(params));
        }
        if(!CommonUtils.isBlank(sortField) && !CommonUtils.isBlank(sortOrder)) {
            sb.append(" order by " + sortField + " " + sortOrder);
        }
        if(pageIndex != -1 && pageSize != -1) {
            sb.append(" limit ?,? ");
            sortParams.add(pageIndex*pageSize);
            sortParams.add(pageSize);
        }

        try {
            pst = conn.prepareStatement(sb.toString());
            int sizeCount = sortParams.size();
            for(int i = 0; i < sizeCount; i++) {
                if((sizeCount - i) <= 2) {
                    pst.setInt(i + 1, Integer.parseInt(sortParams.get(i).toString()));
                }else {
                    pst.setString(i + 1, sortParams.get(i).toString());
                }
            }

            rs = pst.executeQuery();
            while(rs.next()) {
                Retouchinfo info = new Retouchinfo();
                CommonUtils.setValueByRs(info,rs);
                list.add(info);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return list;
    }

    public int getListNum(Map<String, String> params) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        int count = 0;
        StringBuilder sb = new StringBuilder();
        sb.append("select count(1) from "+TABLE_NAME+" where 1=1 ");
        if (!CommonUtils.isBlank(getFilter(params))){
            sb.append(getFilter(params));
        }
        sb.append(" order by retouchguid");
        try {
            pst = conn.prepareStatement(sb.toString());
            rs = pst.executeQuery();
            while(rs.next()) {
                count = rs.getInt(1);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return count;
    }

    public String getFilter(Map<String,String> params){
        String where = "";
        for (String key:params.keySet()){
            where += " and "+key+"='"+params.get(key)+"'";
        }
        return where;
    }

    public List<Retouchinfo> getList(Map<String, String> params) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        List<Retouchinfo> list = new ArrayList<Retouchinfo>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from "+TABLE_NAME+" where 1=1 ");
        if (!CommonUtils.isBlank(getFilter(params))){
            sb.append(" and " + getFilter(params));
        }

        try {
            pst = conn.prepareStatement(sb.toString());
            rs = pst.executeQuery();
            while(rs.next()) {
                Retouchinfo info = new Retouchinfo();
                CommonUtils.setValueByRs(info,rs);
                list.add(info);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return list;
    }

    public List<Retouchinfo> getList(Map<String, String> params,String orderBy) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        List<Retouchinfo> list = new ArrayList<Retouchinfo>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from "+TABLE_NAME+" where 1=1 ");
        if (!CommonUtils.isBlank(getFilter(params))){
            sb.append(getFilter(params));
        }
        if (!CommonUtils.isBlank(orderBy)){
            sb.append(" order by "+orderBy);
        }

        try {
            pst = conn.prepareStatement(sb.toString());
            rs = pst.executeQuery();
            while(rs.next()) {
                Retouchinfo info = new Retouchinfo();
                CommonUtils.setValueByRs(info,rs);
                list.add(info);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return list;
    }

    public List<Retouchinfo> getList(String params,String orderBy) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        List<Retouchinfo> list = new ArrayList<Retouchinfo>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from "+TABLE_NAME+" where 1=1 ");
        if (!CommonUtils.isBlank(params)){
            sb.append(" and " + params);
        }
        if (!CommonUtils.isBlank(orderBy)){
            sb.append(" order by "+orderBy);
        }

        try {
            pst = conn.prepareStatement(sb.toString());
            rs = pst.executeQuery();
            while(rs.next()) {
                Retouchinfo info = new Retouchinfo();
                CommonUtils.setValueByRs(info,rs);
                list.add(info);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return list;
    }
}
