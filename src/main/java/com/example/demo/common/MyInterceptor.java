package com.example.demo.common;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.demo.controller.UserController;
import com.example.demo.entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.net.URLDecoder;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class MyInterceptor implements HandlerInterceptor {
    private int sessionTimeout = 30 * 60 * 1000; // session超时时间，单位为毫秒
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!"/login.html".equals(request.getRequestURI() )&& !"/user/login".equals(request.getRequestURI())){
            // 获取token
            String token = request.getHeader("Authorization");
            if (token == null || token.isEmpty()) {
                token = request.getParameter("Authorization");
            }
            if (token == null || token.isEmpty()) {
                response.sendRedirect("/login.html");
                return false; // 没有Session ID，返回401 Unauthorized
            }
            Result result = JWTUtils.validateJWT(token);
            if (!"200".equals(result.getCode())) {
                System.out.println(token);
                response.sendRedirect("/login.html");
                return false; // Session不存在，返回401 Unauthorized
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 在进入Controller之后，视图渲染之前执行
        // 可以对ModelAndView进行修改
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 在整个请求完成之后执行，可以进行一些资源清理等操作
    }
}
