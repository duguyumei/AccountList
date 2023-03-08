/**
 * https://blog.csdn.net/weixin_42030357/article/details/95629924
 * https://www.jianshu.com/p/e34a579c63a0
 */
package com.example.demo.common;


import io.jsonwebtoken.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.util.Date;

@SpringBootApplication
@RestController
public class JWTUtils {

    private static SecretKey jwtSecret; // 秘钥
    private static SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
//    private static SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
    // 过期时间，单位毫秒
    public static final long EXPIRE_TIME = 60 * 60 * 1000; // 过期时间 1h

    {
        try {
            jwtSecret = CommonUtils.generateKey();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String createJWT(String id,String subject,long ttlMillis){

        JwtBuilder builder = Jwts.builder()
                .setId(id) // jwt唯一标识
                .setSubject(subject) // 所面向的用户，放登录的用户名，一个json格式的字符串，可存放userid，roldid之类，作为用户的唯一标志
                .setIssuer("cc_Account") // 签发者
                .setIssuedAt(new Date()) // iat(issuedAt)：jwt的签发时间
                .signWith(signatureAlgorithm, jwtSecret);

        if (ttlMillis <= 0){
            ttlMillis = EXPIRE_TIME;
        }
        if(ttlMillis > 0){
            long expMillis = System.currentTimeMillis() + ttlMillis;
            Date expDate = new Date(expMillis);
            //设置过期时间
            builder.setExpiration(expDate);
        }

        String token = builder.compact();
        return token;
    }


    public static Result validateJWT(String jwt){
        Result result = null;
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(jwt)
                    .getBody();
            result  = Result.success(claims);
        } catch (RuntimeException e) {
            result = Result.error("500","解析失败");
            result.setData(claims);
        }
        return result;
    }
}
