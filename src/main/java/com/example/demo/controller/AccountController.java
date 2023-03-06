package com.example.demo.controller;
/*
 ** @autor cc
 ** @date 2023/2/12
 */


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.common.CommonUtils;
import com.example.demo.common.JDBCUtils;
import com.example.demo.common.Result;
import com.example.demo.entity.Accountinfo;
import com.example.demo.entity.Retouchinfo;
import com.example.demo.service.IAccountinfoService;
import com.example.demo.service.IRetouchinfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RestController //返回json的controller
@RequestMapping("/accountinfo") //创建统一路由
public class AccountController {
    @Resource
    IAccountinfoService service;
    @Resource
    IRetouchinfoService retouchinfoService;

    @PostMapping("/getAccountinfo")
    public Map<String,Object> getAccountList(HttpServletRequest request, HttpServletResponse response) throws IOException {

        CommonUtils.getEnityParams(Accountinfo.class);
        String paramsStr = request.getParameter("params");
        Map<String,String> params = JSON.parseObject(paramsStr,Map.class);
        String pageIndex = request.getParameter("pageIndex");
        String pageSize = request.getParameter("pageSize");
        String sortField = request.getParameter("sortField");
        String sortOrder = request.getParameter("sortOrder");

        List<Accountinfo> dishlist = service.getAccountinfo(params,Integer.valueOf(pageIndex),Integer.valueOf(pageSize),sortField,sortOrder);
        int count = service.getListNum(params);

        retouchAccount(dishlist,new HashMap<>());

        Map<String,Object> res = new HashMap<String,Object>();
//        String sql = "select sum(money) money from accountinfo where budget='支出'";
//        res.put("outmoney",CommonUtils.getSqlJsonArray("select sum(money) money from accountinfo where budget='支出'")
//                .getJSONObject(0).get("money"));
//        res.put("inmoney",CommonUtils.getSqlJsonArray("select sum(money) money from accountinfo where budget='收入'")
//                .getJSONObject(0).get("money"));
        res.put("data", dishlist);
        res.put("total", count);
        return res;
    }

    public List<Accountinfo> retouchAccount(List<Accountinfo> list,Map<String,String> params){
        List<Retouchinfo>  infoList = retouchinfoService.getList(params);
        for (Accountinfo info : list){
            Map<String,String> map = new HashMap<>();
            List<String> errorList = new ArrayList<>();
            List<Retouchinfo> allList = new ArrayList<>();
            for (Retouchinfo obj : infoList){
                if (!"0".equals(obj.getIsreal()) || "0".equals(obj.getStatus())){
                    break;
                }
                // 判断条件
                Boolean flag = false;
                String left = "";
                String right = "";
                if ("0".equals(obj.getType_left())){
                    left =  obj.getTiaojian_left();
                }
                else if ("1".equals(obj.getType_left())){
                    left =  CommonUtils.getStrValue(info,obj.getTiaojian_left());
                }
                if ("0".equals(obj.getType_right())){
                    right +=  obj.getTiaojian_right();
                }
                else if ("1".equals(obj.getType_right())){
                    right = CommonUtils.getStrValue(info,obj.getTiaojian_left());
                }

                switch (obj.getYunsuanfu()){
                    case "=" :
                        flag = left.equals(right);
                        break;
                    case "!=" :
                        flag = !left.equals(right);
                        break;
                    case "<" :
                        if (CommonUtils.isNumeric(left) && CommonUtils.isNumeric(right)){
                            flag = Double.parseDouble(left) < Double.parseDouble(right);
                        }
                        break;
                    case "<=" :
                        if (CommonUtils.isNumeric(left) && CommonUtils.isNumeric(right)){
                            flag = Double.parseDouble(left) <= Double.parseDouble(right);
                        }
                        break;
                    case ">" :
                        if (CommonUtils.isNumeric(left) && CommonUtils.isNumeric(right)){
                            flag = Double.parseDouble(left) > Double.parseDouble(right);
                        }
                        break;
                    case ">=" :
                        if (CommonUtils.isNumeric(left) && CommonUtils.isNumeric(right)){
                            flag = Double.parseDouble(left) >= Double.parseDouble(right);
                        }
                        break;
                    case "like" :
                        flag = left.contains(right);
                        break;
                    case "%like" :
                        flag = left.startsWith(right);
                        break;
                    case "like%" :
                        flag = left.endsWith(right);
                        break;
                    default:
                        break;
                }
                if (flag) {
                    // 把所有符合条件的对象存入
                    allList.add(obj);
                }
                else if (!CommonUtils.isBlank(obj.getRetouchguid()) && !errorList.contains(obj.getRetouchguid())){
                    // 把不符合的对象的分组值存入
                    errorList.add(obj.getRetouchguid());
                }
            }
            for (Retouchinfo obj : allList){
                // 把符合的对象，且分组值不存在于不符合的中，进行修饰
                if (CommonUtils.isBlank(obj.getRetouchguid()) || !errorList.contains(obj.getRetouchguid())){
                    map.put(obj.getFormat_row(),obj.getFormat_value());
                }
            }
            if (map.size()>0){
                CommonUtils.setValueByMap(info,map);
            }
        }
        return list;
    }

    @PostMapping("/deleteAccount")
    public Result deletdAccount(@RequestParam String rowguid){
        Result result = service.delete(rowguid);
        return result;
    }

    @PostMapping("/getAccountinfoByRowguid")
    public Result getInfoByGuid(@RequestParam String rowguid){
        Accountinfo info = service.getInfoByGuid(rowguid);
        if (info == null){
            return Result.error("404","未找到账单信息");
        }
        return Result.success(JSONObject.toJSON(info));
    }

    @PostMapping("/editInfo")
    public Result editinfo(@RequestBody Accountinfo info){
        info.setUpdate_date(CommonUtils.fmtDate(new Date()));
        Result result = service.editInfo(info);
        return result;
    }

    @PostMapping("/addInfo")
    public Result addinfo(@RequestBody Accountinfo info){
        if (CommonUtils.isBlank(info.getRowguid())){
            info.setRowguid(UUID.randomUUID().toString());
        }
        if (CommonUtils.isBlank(info.getSource())){
            info.setSource("SJ");
        }
        if (CommonUtils.isBlank(info.getTradeguid())){
            info.setTradeguid(UUID.randomUUID().toString());
        }
        Date date = new Date();
        if (CommonUtils.isBlank(info.getImport_date())){
            info.setImport_date(CommonUtils.fmtDate(date));
        }
        info.setUpdate_date(CommonUtils.fmtDate(date));
        Result result = service.addInfo(info);
        return result;
    }
}
