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
        Map<String, SessionInfo> sessionMap = new UserController().getSessionMap();
        if (!"/login.html".equals(request.getRequestURI() )&& !"/user/login".equals(request.getRequestURI())){
            // 从请求头中获取Session ID
            String sessionId = request.getHeader("Authorization");
            if (CommonUtils.isBlank(sessionId)){
                // 从cookies获取
                Cookie[] cookies = request.getCookies();
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if (cookie.getName().equals("Authorization")) {
                            sessionId = URLDecoder.decode(cookie.getValue(), "UTF-8");
                            break;
                        }
                    }
                }
            }
            if (sessionId == null || sessionId.isEmpty()) {
                response.sendRedirect("/login.html");
                return false; // 没有Session ID，返回401 Unauthorized
            }
            sessionId = CommonUtils.decrypt(sessionId);
            SessionInfo sessionInfo = sessionMap.get(sessionId); // 从内存中获取Session
            if (sessionInfo == null) {
                response.sendRedirect("/login.html");
                return false; // Session不存在，返回401 Unauthorized
            }
            long currentTime = System.currentTimeMillis();
            if (sessionInfo.getCreateTime() + sessionTimeout < currentTime) {
                sessionMap.remove(sessionId); // Session超时，从内存中移除
                response.sendRedirect("/login.html");
                return false; // Session超时，返回401 Unauthorized
            }
//            String checksum = sessionInfo.getChecksum();
//            String username = sessionInfo.getUsername();
//            String password = sessionInfo.getPassword();
//            String calculatedChecksum = calculateChecksum(sessionId, username, password); // 计算校验码
//            if (!checksum.equals(calculatedChecksum)) {
//                sessionMap.remove(sessionId); // 校验码不正确，从内存中移除
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                return false; // 校验码不正确，返回401 Unauthorized
//            }
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
