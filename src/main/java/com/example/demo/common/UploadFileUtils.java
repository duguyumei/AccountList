package com.example.demo.common;
/*
 ** @autor cc
 ** @date 2022/6/15
 */

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

public class UploadFileUtils {
    public static String uploadFile(MultipartFile file, String importZipFolderPath) {
        //判断文件夹路径是否存在
        File importZipFolder = new File(importZipFolderPath);
        if(!importZipFolder.exists()) {
            importZipFolder.mkdirs();
        }
        String fileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        //上传的文件名称
        String importZipFilePath = importZipFolderPath+ uuid +fileName;
        InputStream in = null;
        FileOutputStream out = null;
        try {
            in =  file.getInputStream();
            out = new FileOutputStream(importZipFilePath);
            int len = 0;
            byte[] byt = new byte[in.available()];
            while((len = in.read(byt))!=-1) {
                out.write(byt);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if(in != null)
                    in.close();
                if(out!=null)
                    out.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return importZipFilePath;
    }


    /**
     * @author wxy 20211028
     * 判断目录与目录下所有文件名称长度是否超出限制
     * @param files
     * 目录下文件集合
     * @param maxLength
     * 规定的最大长度
     * @return
     */
    public static boolean checkNameLength(File[] files,int maxLength,String suffixName,String specificationName) {
        for (int i = 0; i < files.length; i++) {
            File file = files[i];
            if (file.getPath().toLowerCase().endsWith(suffixName)) {
                if (file.getName().length() > maxLength && file.getName().equals(specificationName)) {
                    return false;
                }
            }
        }
        return true;
    }
}
