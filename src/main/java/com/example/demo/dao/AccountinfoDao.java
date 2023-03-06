package com.example.demo.dao;
/*
 ** @autor cc
 ** @date 2023/2/12
 */

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONArray;
import com.example.demo.common.CommonUtils;
import com.example.demo.common.JDBCUtils;
import com.example.demo.common.Result;
import com.example.demo.entity.Accountinfo;
import com.example.demo.entity.Retouchinfo;
import com.example.demo.service.IRetouchinfoService;

import javax.annotation.Resource;
import java.sql.*;
import java.text.ParseException;
import java.util.*;
import java.util.Date;

public class AccountinfoDao {
    private final String TABLE_NAME = "accountinfo";
    /**
     * 列表插入
     * @param list
     * @return
     */
    public Result setAccountList(List<Accountinfo> list){
        Connection conn = JDBCUtils.getConnection();
        try {
            conn.setAutoCommit(false);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        PreparedStatement pst = null;
        ResultSet rs = null;

        int errorNum = 0;
        int successNum = 0;
        int sumNum = 0;
        try {
            for (Accountinfo info : list){
                sumNum++;
                // 判断是否存在相同账单号
                String chongtuSql = "select count(*) count from "+TABLE_NAME+" where tradeguid='"+info.getTradeguid()+"'";
                JSONArray arr = CommonUtils.getSqlJsonArray(chongtuSql);
                int count = arr.getJSONObject(0).getInteger("count");
                if (count > 0 ){
                    errorNum++;
                    continue;
                }

                String sql = "INSERT INTO "+TABLE_NAME+" (rowguid,import_date,real_date,type,remark,source,money," +
                        "target,goods,budget,paytype,status,tradeguid,merchantguid,update_date,money_status) " +
                        "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                pst = conn.prepareStatement(sql);
                pst.setString(1, info.getRowguid());
                pst.setString(2, info.getImport_date());
                pst.setString(3, info.getReal_date());
                pst.setString(4, info.getType());
                pst.setString(5, info.getRemark());
                pst.setString(6, info.getSource());
                pst.setDouble(7, info.getMoney());
                pst.setString(8, info.getTarget());
                pst.setString(9, info.getGoods());
                pst.setString(10, info.getBudget());
                pst.setString(11, info.getPaytype());
                pst.setString(12, info.getStatus());
                pst.setString(13, info.getTradeguid());
                pst.setString(14, info.getMerchantguid());
                pst.setString(15, info.getUpdate_date());
                pst.setString(16, info.getMoney_status());
                pst.executeUpdate();
                successNum++;
            }
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
        return Result.success("共"+sumNum+"条数据，成功导入"+successNum+"条，存在"+errorNum+"条订单号冲突！");
    }

    /**
     * 获取表格数据
     * @param params
     * @param pageIndex
     * @param pageSize
     * @param sortField
     * @param sortOrder
     * @return
     */
    public List<Accountinfo> getAccountList(Map<String,String> params, Integer pageIndex, Integer pageSize, String sortField,
                                         String sortOrder) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        List<Accountinfo> list = new ArrayList<Accountinfo>();
        List<Object> sortParams = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        sb.append("select * from "+TABLE_NAME+" where 1=1 ");
        if (!CommonUtils.isBlank(getFilter(params))){
            sb.append(getFilter(params));
        }
        if(!StringUtils.isEmpty(sortField) && !StringUtils.isEmpty(sortOrder)) {
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
                Accountinfo info = new Accountinfo();
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

    public int getListNum(Map<String,String> params){
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        int count = 0;
        StringBuilder sb = new StringBuilder();
        sb.append("select count(1) from "+TABLE_NAME+" where 1=1 ");
        if (!CommonUtils.isBlank(getFilter(params))){
            sb.append(getFilter(params));
        }


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

    public String getFilter(Map<String,String> params) {
        if (params == null || params.size() < 1){
            return "";
        }
        RetouchinfoDao retouchinfoDao = new RetouchinfoDao();
        String where = "";
        int n = 0;
        int m = params.size();
        for (String key : params.keySet()) {
            params.size();
            Map map = new HashMap();
            map.put("format_row", key);
            List<Retouchinfo> list = retouchinfoDao.getList(map, "retouchguid");
            List<String> orList = new ArrayList<>();
            List<String> andList = new ArrayList<>();
            String proguid = "";
            for (Retouchinfo retouchinfo : list) {
                n++;
                if (CommonUtils.isBlank(retouchinfo.getRowguid())) {
                    orList.add(getFilterByRetouch(retouchinfo));
                } else {
                    if (proguid.equals(retouchinfo.getRetouchguid())) {
                        andList.add(getFilterByRetouch(retouchinfo));
                        if (n == m){
                            orList.add("(" + String.join(" and ", andList) + ")");
                        }
                    } else {
                        if (andList.size() > 0) {
                            orList.add("(" + String.join(" and ", andList) + ")");
                        }
                        proguid = retouchinfo.getRetouchguid();
                        andList.add(getFilterByRetouch(retouchinfo));
                    }
                }
            }
            if (orList.size() > 0){
                where = " and (" + String.join(" or ", orList) + ")";
            }
        }
        System.out.println(where);
        return where;
    }

    public String getFilterByRetouch(Retouchinfo info){
        String left = "";
        String right = "";
        String where = "";
        if ("0".equals(info.getType_left())){
            left =  "'"+info.getTiaojian_left()+"'";
        }
        else if ("1".equals(info.getType_left())){
            left =  info.getTiaojian_left();
        }
        if ("0".equals(info.getType_right())){
            right +=  "'"+info.getTiaojian_right()+"'";
        }
        else if ("1".equals(info.getType_right())){
            right = info.getTiaojian_right();
        }

        switch (info.getYunsuanfu()){
            case "=" :
                where = left + " = " + right;
                break;
            case "!=" :
                where = left + " != " + right;
                break;
            case "<" :
                where = left + " < " + right;
                break;
            case "<=" :
                where = left + " <= " + right;
                break;
            case ">" :
                where = left + " > " + right;
                break;
            case ">=" :
                where = left + " >= " + right;
                break;
            case "like" :
                where = "LOCATE("+right+","+left+")";
                break;
            case "%like" :
                where = "left("+left+",char_length("+right+"))="+right;
                break;
            case "like%" :
                where = "right("+left+",char_length("+right+"))="+right;
                break;
            default:
                break;
        }
        return " "+where+" ";
    }

    public Result delete(String rowguid) {
        String sql = "delete from "+TABLE_NAME+" where rowguid='"+rowguid+"'";
        int num = CommonUtils.getSqlUpdateNum(sql);
        Result result = null;
        if (num > 0){
            result = Result.success("删除成功");
        }
        else {
            result = Result.success("未查找到该条数据");
        }
        return result;
    }

    public Accountinfo getInfoByGuid(String rowguid) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        Accountinfo info = null;
        StringBuilder sb = new StringBuilder();
        sb.append("select * from "+TABLE_NAME+" where rowguid='"+rowguid+"' limit 1;");

        try {
            pst = conn.prepareStatement(sb.toString());

            rs = pst.executeQuery();
            while(rs.next()) {
                info = new Accountinfo();
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

    public Result editInfo(Accountinfo info) {
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


    public Result addInfo(Accountinfo info) {
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        int n = 0;
        List paramList =  new ArrayList();
        List valueList =  new ArrayList();
        Map<String,String> map = CommonUtils.getFieldValueMap(info);
        for (String str:map.keySet()){
            paramList.add(str);
            if (map.get(str) == null){
                valueList.add("null");
            }
            else{
                valueList.add("'"+map.get(str)+"'");
            }
        }
        String sql = "INSERT INTO "+TABLE_NAME+" ( "+String.join(",",paramList)+" ) " +
                "values ( "+String.join(",",valueList)+" );";
        try {
            pst = conn.prepareStatement(sql);
            n = pst.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        if (n < 1){
            return Result.error("500","导入失败");
        }
        return Result.success("成功导入！");
    }
}
