package com.example.demo.controller;
/*
 ** @autor cc
 ** @date 2023/2/17
 */

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.IZiduanService;
import com.example.demo.service.Impl.ZiduanService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController //返回json的controller
@RequestMapping("/ziduan") //创建统一路由
public class ZiduanController {
    @Resource
    IZiduanService service;

    @GetMapping("/getAccountRows")
    public String getAccountRows(){
        return JSONObject.toJSONString(service.getRiduanList());
    }
}
