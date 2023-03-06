package com.example.demo.controller;
/*
 ** @autor cc
 ** @date 2023/2/16
 */

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.common.CommonUtils;
import com.example.demo.common.JDBCUtils;
import com.example.demo.common.Result;
import com.example.demo.entity.Accountinfo;
import com.example.demo.entity.Retouchinfo;
import com.example.demo.entity.Yunsuanfu;
import com.example.demo.service.IRetouchinfoService;
import com.example.demo.service.Impl.RetouchinfoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController //返回json的controller
@RequestMapping("/retouchinfo") //创建统一路由
public class RetouchController {
    @Resource
    IRetouchinfoService service;

    private List<Yunsuanfu> yunsuanfulist = null;

    @PostMapping("/addRetouch")
    public Result addRetouch(@RequestBody Retouchinfo info){
        Result result = service.addRetouch(info);
        return result;
    }

    @PostMapping("/getList")
    public Map<String,Object> getAccountList(HttpServletRequest request, HttpServletResponse response) throws IOException {

        CommonUtils.getEnityParams(Accountinfo.class);
        Map<String,String> params = new HashMap<>();
        String pageIndex = request.getParameter("pageIndex");
        String pageSize = request.getParameter("pageSize");
        String sortField = request.getParameter("sortField");
        String sortOrder = request.getParameter("sortOrder");

        List<Retouchinfo> list = service.getList(params,Integer.valueOf(pageIndex),Integer.valueOf(pageSize),sortField,sortOrder);
        int count = service.getListNum(params);

        JSONArray jsonArray = JSONArray.parseArray(JSON.toJSONString(list));
        for (int i = 0; i < jsonArray.size(); i++){
            String tiaojian_left = "";
            String tiaojian_right = "";
            String tiaojian = "";
            JSONObject obj = jsonArray.getJSONObject(i);
            // 处理条件
            // 获取左右值
            if ("0".equals(obj.getString("type_left"))){
                tiaojian_left +=  obj.getString("tiaojian_left");
            }
            else if ("1".equals(obj.getString("type_left"))){
                JSONArray arr = CommonUtils.getSqlJsonArray("select * from ziduan z where english_name = '"+
                        obj.getString("tiaojian_left")+"' limit 1;");
                if (arr.size() > 0){
                    tiaojian_left +=  "[#='"+arr.getJSONObject(0).getString("chinese_name")+"']";
                }
                else {
                    tiaojian_left +=  "[#='？？？']";
                }
            }
            if ("0".equals(obj.getString("type_right"))){
                tiaojian_right +=  obj.getString("tiaojian_right");
            }
            else if ("1".equals(obj.getString("type_right"))){
                JSONArray arr = CommonUtils.getSqlJsonArray("select * from ziduan z where english_name = '"+
                        obj.getString("tiaojian_right")+"' limit 1;");
                if (arr.size() > 0){
                    tiaojian_right +=  "[#='"+arr.getJSONObject(0).getString("chinese_name")+"']";
                }
                else {
                    tiaojian_right +=  "[#='？？？']";
                }

            }

            // 根据运算符拼接左右值
            switch (obj.getString("yunsuanfu")){
                case "like" :
                    tiaojian = tiaojian_left + " like %" + tiaojian_right +"%";
                    break;
                case "%like" :
                    tiaojian = tiaojian_left + " like " + tiaojian_right +"%";
                    break;
                case "like%" :
                    tiaojian = tiaojian_left + " like %" + tiaojian_right;
                    break;
                default:
                    tiaojian = tiaojian_left + " " + obj.getString("yunsuanfu") + " " + tiaojian_right;
                    break;
            }
            obj.put("tiaojian",tiaojian);

            // 处理修饰行
            JSONArray arr = CommonUtils.getSqlJsonArray("select * from ziduan z where english_name = '"+
                    obj.getString("format_row")+"' limit 1;");
            obj.put("format_row",arr.getJSONObject(0).getString("chinese_name"));

            // 处理状态
            String status = "开启";
            if ("0".equals(obj.get("status"))){
                status = "禁用";
            }
            obj.put("status",status);
        }

        Map<String,Object> res = new HashMap<String,Object>();
        res.put("data", jsonArray);
        res.put("total", count);
        return res;
    }


    @GetMapping("/getyunsuanfu")
    public String getYunSuanFu(){
        if (yunsuanfulist == null){
            yunsuanfulist = new ArrayList<>();
            yunsuanfulist.add(new Yunsuanfu("等于","="));
            yunsuanfulist.add(new Yunsuanfu("不等于","!="));
            yunsuanfulist.add(new Yunsuanfu("小于","<"));
            yunsuanfulist.add(new Yunsuanfu("小于等于","<="));
            yunsuanfulist.add(new Yunsuanfu("大于",">"));
            yunsuanfulist.add(new Yunsuanfu("大于等于",">="));
            yunsuanfulist.add(new Yunsuanfu("含有","like"));
            yunsuanfulist.add(new Yunsuanfu("开头为","%like"));
            yunsuanfulist.add(new Yunsuanfu("结尾为","like%"));
        }
        return JSONObject.toJSONString(yunsuanfulist);
    }


}
