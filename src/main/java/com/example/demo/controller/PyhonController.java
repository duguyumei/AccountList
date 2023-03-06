package com.example.demo.controller;
/*
 ** @autor cc
 ** @date 2022/4/5
 */


import com.example.demo.common.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController //返回json的controller
@RequestMapping("/recommend") //创建统一路由
public class PyhonController {
    @GetMapping
    public Result<?> getRecommend(@RequestParam String openid) {
        BufferedReader bufferReader = null;
        String str = "";
        try {
            //创建子进程，调用命令行启动Python程序并传参传递参数
            String[] args1 = new String[]{"python", "E:\\notejs\\manage\\py\\recommend.py", openid};
            Process process = Runtime.getRuntime().exec(args1);
            //读取Python程序的输出
            String buffer = null;
            bufferReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            while ((buffer = bufferReader.readLine()) != null) {
                str += buffer;
//                System.out.println(buffer);
            }
            //当前进程等待子进程执行完毕
            process.waitFor();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                bufferReader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return Result.success(str);
    }
}
