package com.example.demo.controller;
/*
 ** @autor cc
 ** @date 2022/3/22
 */

import com.example.demo.common.CommonUtils;
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

    private static Map<String, SessionInfo> sessionMap = new ConcurrentHashMap<>();


    //登录
    @PostMapping("/login")
    public Result<?> loginUser(@RequestBody User info, HttpServletResponse response){
        User user = service.getInfoById(info.getLoginid());
        Result result = null;
        if (user != null && !CommonUtils.isBlank(user.getRowguid())){
            if (user.getPassword().equals(CommonUtils.md5Hex(info.getPassword()))){
                result = Result.success("登录成功！");
                String sessionId = UUID.randomUUID() + "--" + user.getRowguid();
                String encryptedSessionId = null;
                try {
                    encryptedSessionId = CommonUtils.encrypt(sessionId);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
                SessionInfo sessionInfo = new SessionInfo();
                sessionInfo.setUser(user);
                sessionInfo.setCreateTime(System.currentTimeMillis());
                sessionMap.put(sessionId,sessionInfo);
                response.setHeader("Authorization", encryptedSessionId);
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

    public static Map<String, SessionInfo> getSessionMap(){
        return sessionMap;
    }

}
