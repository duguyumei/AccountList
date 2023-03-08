package com.example.demo.common;


import io.jsonwebtoken.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.util.Date;

@SpringBootApplication
@RestController
public class JWTUtils {
    private static SecretKey jwtSecret;
//    private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
    private static SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;

    {
        try {
            jwtSecret = CommonUtils.generateKey();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String createJWT(String id,String subject,long ttlMillis,SecretKey key){

        JwtBuilder builder = Jwts.builder()
                .setId(id)
                .setSubject(subject)
                .setIssuer("user")
                .setIssuedAt(new Date())
                .signWith(signatureAlgorithm, key);

        if(ttlMillis >= 0){
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
        } catch (ExpiredJwtException e) {
            result = Result.error("500","解析失败");
            result.setData(claims);
        }
        return result;
    }
}
