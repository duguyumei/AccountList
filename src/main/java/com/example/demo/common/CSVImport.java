package com.example.demo.common;
/*
 ** @autor cc
 ** @date 2023/2/12
 */

import com.example.demo.entity.Accountinfo;
import com.example.demo.service.IAccountinfoService;
import com.csvreader.CsvReader;
import org.springframework.stereotype.Controller;


import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.nio.charset.Charset;
import java.util.*;

@Controller
public class CSVImport {
    @Resource
    IAccountinfoService service;
    private static CSVImport cSVImport;

    private CommonUtils utils = new CommonUtils();
    private final String WX_R1 = "微信支付账单明细";
    private final String WX_R17 = "----------------------微信支付账单明细列表--------------------";
    private final String ZFB_R1 = "支付宝交易记录明细查询";
    private final String ZFB_R4 = "---------------------------------交易记录明细列表------------------------------------";
    private final String ZFB_END = "------------------------------------------------------------------------------------";
    private static final String UFEFF = "\uFEFF";

    @PostConstruct
    public void init(){
        cSVImport = this;
        cSVImport.service = this.service;
    }
    public Result csvImport(String filepath) {
        Result result = new Result();
        Map<String, Object> map = new HashMap<>();
        List<Accountinfo> list = new ArrayList<>();
        ArrayList<String[]> csvList = new ArrayList<String[]>();

        CsvReader reader = null;
        // 微信是utf-8 支付宝是ANSI 先试着微信
        try {
            reader = new CsvReader(filepath,',',Charset.forName("utf-8"));

            while(reader.readRecord()){
                csvList.add(reader.getValues());
            }
            reader.close();
            // 如果是乱码
            if (CommonUtils.isMessyCode(csvList.get(0)[0])){
                csvList = new ArrayList<String[]>();
                reader = new CsvReader(filepath,',',Charset.forName("GBK"));

                while(reader.readRecord()){
                    csvList.add(reader.getValues());
                }
                reader.close();
                if (CommonUtils.isMessyCode(csvList.get(0)[0])){
                    map.put("type","error");
                    map.put("message","编码不支持");
                    throw new RuntimeException("编码不支持");
                }
            }

            int rowNum = csvList.size();
            if (rowNum > 16 && WX_R1.equals(specialUnicode(csvList.get(0)[0])) && WX_R17.equals(specialUnicode(csvList.get(15)[0]))){
                // wx
                String source = "WX";
                String import_date = utils.dateToString(new Date());
                for (int i = 0; i < csvList.size(); i++){
                    if (i < 17) {
                        continue;
                    }
                    String[] row = csvList.get(i);
                    String real_date = specialUnicode(row[0]);//进行日期格式化
                    String type = specialUnicode(row[1]);
                    String target = specialUnicode(row[2]);
                    String goods = specialUnicode(row[3]);
                    String budget = specialUnicode(row[4]);
                    Double money = 0.0;
                    StringBuilder sb = new StringBuilder(specialUnicode(row[5]));
                    if (CommonUtils.isNumeric(sb.substring(0,1))){
                        money = Double.parseDouble(specialUnicode(row[5]));
                    }
                    else {
                        money = Double.parseDouble(sb.substring(1,sb.length()));
                    }
                    String paytaype = specialUnicode(row[6]);
                    String status = specialUnicode(row[7]);
                    String tradeguid = specialUnicode(row[8]);
                    String merchantguid = specialUnicode(row[9]);
                    String remark = specialUnicode(row[10]);

                    Accountinfo info = new Accountinfo(import_date,real_date,type,source,money,target,goods,
                            budget,paytaype,status,tradeguid,merchantguid,remark);
                    list.add(info);
                }
                result = cSVImport.service.importExcel(list);
                map.put("type","WX");
                map.put("message","导入成功");
            }
            else if (rowNum > 4 && ZFB_R1.equals(specialUnicode(csvList.get(0)[0]))
                    && ZFB_R4.equals(specialUnicode(csvList.get(3)[0]))){
                String source = "ZFB";
                String import_date = utils.dateToString(new Date());
                for (int i = 0; i < csvList.size(); i++){
                    if (i < 5) {
                        continue;
                    }
                    String[] row = csvList.get(i);
                    if (ZFB_END.equals(row[0]) && row.length < 2){
                        break;
                    }
                    String tradeguid = specialUnicode(row[0]);
                    String merchantguid = specialUnicode(row[1]);
                    String real_date = specialUnicode(row[3]);
                    if (CommonUtils.isBlank(real_date)){
                        real_date = specialUnicode(row[2]);
                    }
                    String update_date = specialUnicode(row[4]);
                    String type = specialUnicode(row[5]);
                    String paytaype = specialUnicode(row[6]);
                    String target = specialUnicode(row[7]);
                    String goods = specialUnicode(row[8]);
                    Double money = 0.0;
                    StringBuilder sb = new StringBuilder(specialUnicode(row[9]));
                    if (CommonUtils.isNumeric(sb.substring(0,1))){
                        money = Double.parseDouble(specialUnicode(row[9]));
                    }
                    else {
                        money = Double.parseDouble(sb.substring(1,sb.length()));
                    }
                    String budget = specialUnicode(row[10]);
                    String status = specialUnicode(row[11]);
                    Double serve_fee = 0.0;
                    StringBuilder sb2 = new StringBuilder(specialUnicode(row[12]));
                    if (CommonUtils.isNumeric(sb2.substring(0,1))){
                        if (Double.parseDouble(sb2.toString()) != serve_fee){
                            serve_fee = Double.parseDouble(sb2.toString());
                        }
                    }
                    else {
                        if (Double.parseDouble(sb2.substring(1,sb2.length())) != serve_fee){
                            serve_fee = Double.parseDouble(sb2.substring(1,sb2.length()));
                        }
                    }
                    Double refund_fee = 0.0;
                    StringBuilder sb3 = new StringBuilder(specialUnicode(row[13]));
                    if (CommonUtils.isNumeric(sb3.substring(0,1))){
                        if (Double.parseDouble(sb3.toString()) != refund_fee){
                            refund_fee = Double.parseDouble(sb3.toString());
                        }
                    }
                    else {
                        if (Double.parseDouble(sb3.substring(1,sb3.length())) != refund_fee){
                            refund_fee = Double.parseDouble(sb3.substring(1,sb3.length()));
                        }
                    }
                    String remark = specialUnicode(row[14]);
                    String money_status = specialUnicode(row[15]);
                    Accountinfo info = new Accountinfo(import_date,real_date,type,source,money,target,goods,
                            budget,paytaype,status,tradeguid,merchantguid,remark,update_date,money_status);
                    list.add(info);
                }
                result = cSVImport.service.importExcel(list);
                map.put("type","ZFB");
                map.put("message","导入成功");
            }
            else {
                map.put("type","error");
                map.put("message","csv格式错误");
                throw new RuntimeException("csv格式错误");
            }

        } catch (Exception e) {
            map.put("type","error");
            map.put("message","csv格式错误");
            e.printStackTrace();
        }
        result.setData(map);
        return result;
    }

    public String specialUnicode(String str){
        if (str.startsWith("\uFEFF")){
            str = str.replace("\uFEFF", "");
        }else if (str.endsWith("\uFEFF")){
            str = str.replace("\uFEFF","");
        }

        if ("/".equals(str)){
            str = "";
        }
        return str;
    }
}
