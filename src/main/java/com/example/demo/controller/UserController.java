package com.example.demo.controller;
/*
 ** @autor cc
 ** @date 2022/3/22
 */

import com.alibaba.fastjson.JSON;
import com.example.demo.common.CommonUtils;
import com.example.demo.common.JWTUtils;
import com.example.demo.common.Result;
import com.example.demo.common.SessionInfo;
import com.example.demo.entity.User;
import com.example.demo.service.IUserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    IUserService service;

    //登录
    @PostMapping("/login")
    public Result<?> loginUser(@RequestBody User info, HttpServletResponse response){
        User user = service.getInfoById(info.getLoginid());
        Result result = null;
        if (user != null && !CommonUtils.isBlank(user.getRowguid())){
            if (user.getPassword().equals(CommonUtils.md5Hex(info.getPassword()))){
                User _user = new User();
                _user.setRowguid(user.getRowguid());
                _user.setDispalyname(user.getDispalyname());
                String jwt = JWTUtils.createJWT(UUID.randomUUID().toString(), JSON.toJSONString(_user),0);
                result = Result.success("登录成功！");
                result.setData(jwt);
            }
            else {
                result = Result.error("500","密码错误");
            }
        }
        else {
            result = Result.error("404","账号错误");
        }
        return result;
    }

    // 注销登录
    @RequestMapping("/logout")
    public String logout(@RequestBody User info){
        return "login";
    }

}
