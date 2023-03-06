package com.example.demo.entity;
/*
 ** @autor cc
 ** @date 2023/2/12
 */


import lombok.Data;

import java.util.UUID;

//@TableName("accountinfo") //引用了mybatis-plus插件后需要这个注释,参数值与存储该对象的表名相同
@Data//使用lombok后简化了javabean操作,不需要再写get/set方法,会自动的通过注解生成
public class Accountinfo {
    // accountinfo
//    @TableId(value = "rowguid")//设置表id,实现自增,value值为数据库中的id字段名
    private String rowguid; // 唯一标识
    private String import_date; // 导入时间
    private String real_date; //账单时间
    private String type; //种类
    private String remark; //备注
    private String source; //订单来源
    private Double money; //金额
    private String target; //交易对方
    private String goods; //商品
    private String budget; //收or支
    private String paytype; //支付方式
    private String status; //订单状态
    private String tradeguid; //交易单号
    private String merchantguid; //商户单号
    private String update_date; // 修改时间
    private String money_status; //金额状态


    public Accountinfo(){

    }

    public Accountinfo(String import_date,String real_date,String type,String source,Double money,String target,
                       String goods,String budget,String paytype,String status,String tradeguid,String merchantguid,
                       String remark){
        this.rowguid = UUID.randomUUID().toString();
        this.import_date = import_date;
        this.real_date = real_date;
        this.type = type;
        this.source = source;
        this.money = money;
        this.target = target;
        this.goods = goods;
        this.budget = budget;
        this.paytype = paytype;
        this.status = status;
        this.tradeguid = tradeguid;
        this.merchantguid = merchantguid;
        this.remark = remark;
        this.update_date = real_date;
        this.money_status = status;
    }

    public Accountinfo(String import_date,String real_date,String type,String source,Double money,String target,
                       String goods,String budget,String paytype,String status,String tradeguid,String merchantguid,
                       String remark,String update_date,String money_status){
        this.rowguid = UUID.randomUUID().toString();
        this.import_date = import_date;
        this.real_date = real_date;
        this.type = type;
        this.source = source;
        this.money = money;
        this.target = target;
        this.goods = goods;
        this.budget = budget;
        this.paytype = paytype;
        this.status = status;
        this.tradeguid = tradeguid;
        this.merchantguid = merchantguid;
        this.remark = remark;
        this.update_date = update_date;
        this.money_status = money_status;
    }

}
