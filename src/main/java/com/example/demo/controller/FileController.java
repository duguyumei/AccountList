package com.example.demo.controller;
/*
 ** @autor cc
 ** @date 2022/3/18
 */

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import com.example.demo.common.CSVImport;
import com.example.demo.common.Result;
import com.example.demo.common.UploadFileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {
    //ip 端口
    private final static String IP = "http://localhost";
    @Value("${server.port}")
    private String port;

    //上传接口
    @PostMapping("/upload")
    public Result<?> upload(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();//获取文件名
        //定义唯一标识 使用工具类生成uuid
        String uuid = UUID.randomUUID().toString();
        //文件路劲
        String filePath = System.getProperty("user.dir") + "/springboot/src/main/resources/files/" + uuid + originalFilename;
        //使用工具类写入路劲  抛出io异常
        FileUtil.writeBytes(file.getBytes(),filePath);
        //返回url
        return Result.success(IP + ":" + port + "/files/" + uuid);
    }

    //下载接口
    @GetMapping("/{uuid}")
    public void getFiles(@PathVariable String uuid, HttpServletResponse response){
        //新建一个输出流对象
        OutputStream os;
        //获取文件路劲
        String basePath = System.getProperty("user.dir") + "/springboot/src/main/resources/files/";
        //获取所有文件名
        List<String> fileNames = FileUtil.listFileNames(basePath);
        String fileName = fileNames.stream().filter(name -> name.contains(uuid)).findAny().orElse("");
        try{
            if (StrUtil.isNotEmpty(fileName)){
                response.addHeader("Content-Dispostition","attachment;filename=" + URLEncoder.encode(fileName,"UTF-8"));
                response.setContentType("application/octet-stream");
                //通过文件路劲读取字节流
                byte[] bytes = FileUtil.readBytes(basePath+fileName);
                os = response.getOutputStream();
                os.write(bytes);
                os.flush();
                os.close();
            }
        }catch (Exception e){
            System.out.println(e);
        }
    }

    //上传接口

    @RequestMapping(value="uploadFiles",method = RequestMethod.POST)
    public Result uploadFiles(MultipartFile file) {
//        String userFilePath = request.getParameter("userFilePath");
        //上传文件夹路径
        String importZipFolderPath = System.getProperty("user.dir") + "/src/main/resources/files/";
        String filePath = UploadFileUtils.uploadFile(file, importZipFolderPath);

        // 解析文件
        Result result = new CSVImport().csvImport(filePath);
        return  result;
    }
}
