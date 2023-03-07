package com.example.demo.common;
/*
 ** @autor cc
 ** @date 2023/2/12
 */

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sun.tools.javac.code.Attribute;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.util.DigestUtils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.security.SecureRandom;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.text.DateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public  class CommonUtils {
    public static Date stringToDate(String date,String sdf) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(sdf);
        return simpleDateFormat.parse(date);
    }

    public static Date stringToDate(String date) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return simpleDateFormat.parse(date);
    }

    public static String dateToString(Date date){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return simpleDateFormat.format(date);
    }

    public static String dateToString(Date date,String sdf){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("sdf");
        return simpleDateFormat.format(date);
    }

    public static String toDateStr(Timestamp tt){
        if(null!=tt){
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(tt);
        }
        return "";
    }

    public static Date toDate(Timestamp tt) throws ParseException {
        DateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = stringToDate(toDateStr(tt));
        return date;
    }

    /**
     * 是否为数字
     * @param cs
     * @return
     */
    public static boolean isNumeric(final CharSequence cs) {
        // 判断是否为空，如果为空则返回false
        if (cs == null || cs.length() == 0) {
            return false;
        }
        // 通过 length() 方法计算cs传入进来的字符串的长度，并将字符串长度存放到sz中
        final int sz = cs.length();
        // 通过字符串长度循环
        for (int i = 0; i < sz; i++) {
            // 判断每一个字符是否为数字，如果其中有一个字符不满足，则返回false
            if (!Character.isDigit(cs.charAt(i))) {
                return false;
            }
        }
        // 验证全部通过则返回true
        return true;
    }

    /**
     * 是否为空
     * @param cs
     * @return
     */
    public static Boolean isBlank(CharSequence cs){
        int strLen;
        if (cs == null || (strLen = cs.length()) == 0){
            return true;
        }
        for (int i = 0; i < strLen; i++){
            if (Character.isWhitespace(cs.charAt(i)) == false){
                return false;
            }
        }
        return true;
    }

    /**
     * 判断字符是否是中文
     *
     * @param c 字符
     * @return 是否是中文
     */
    public static boolean isChinese ( char c ) {
        Character . UnicodeBlock ub = Character . UnicodeBlock . of ( c ) ;
        if ( ub == Character . UnicodeBlock . CJK_UNIFIED_IDEOGRAPHS
                || ub == Character . UnicodeBlock . CJK_COMPATIBILITY_IDEOGRAPHS
                || ub == Character . UnicodeBlock . CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
                || ub == Character . UnicodeBlock . GENERAL_PUNCTUATION
                || ub == Character . UnicodeBlock . CJK_SYMBOLS_AND_PUNCTUATION
                || ub == Character . UnicodeBlock . HALFWIDTH_AND_FULLWIDTH_FORMS ) {
            return true ;
        }
        return false ;
    }

    /**
     * 判断字符串是否是乱码
     *
     * @param strName 字符串
     * @return 是否是乱码
     */
    public static boolean isMessyCode ( String strName ) {
        Pattern p = Pattern. compile ( "\\s*|\t*|\r*|\n*" ) ;
        Matcher m = p . matcher ( strName ) ;
        String after = m . replaceAll ( "" ) ;
        String temp = after . replaceAll ( "\\p{P}" , "" ) ;
        char [ ] ch = temp . trim ( ) . toCharArray ( ) ;
        float chLength = ch . length ;
        float count = 0 ;
        for ( int i = 0 ; i < ch . length ; i ++ ) {
            char c = ch [ i ] ;
            if ( ! Character . isLetterOrDigit ( c ) ) {
                if ( ! isChinese ( c ) ) {
                    count = count + 1 ;
                }
            }
        }
        float result = count / chLength ;
        if ( result > 0.4 ) {
            return true ;
        } else {
            return false ;
        }

    }

    /**
     * 获取类的相关数据
     * @param obj
     * @return
     */
    public static Map <String, List<String>> getEnityParams(Class obj){
        // 获取obj的所有属性域
        Field[] fields = obj.getDeclaredFields();

        Map map = new HashMap<String, List>();
        List<String> typeList = new ArrayList<>();
        List<String> nameList = new ArrayList<>();
        List<String> paramsList = new ArrayList<>();
        List<String> list = new ArrayList<>();
        List<String> typeList4guid = new ArrayList<>();
        List<String> nameList4guid = new ArrayList<>();
        List<String> list4guid = new ArrayList<>();
        List<String> paramsList4guid = new ArrayList<>();

        for (Field field :fields){
            String [] types = field.getType().getName().split("\\.");
            String vartype = "";
            if (types.length > 0){
                vartype = types[types.length - 1];
            }
            else {
                vartype = types[0];
            }
            String varname = field.getName();

            if (!"rowguid".equalsIgnoreCase(varname)){
                typeList.add(vartype);
                nameList.add(varname);
                paramsList.add("?");
                list.add(vartype + " " + varname);
            }
            typeList4guid.add(vartype);
            nameList4guid.add(varname);
            paramsList4guid.add("?");
            list4guid.add(vartype + " " + varname);
        }
        map.put("types",typeList);
        map.put("names",nameList);
        map.put("params",paramsList);
        map.put("all",list);
        map.put("types4guid",typeList4guid);
        map.put("names4guid",nameList4guid);
        map.put("params4guid",paramsList4guid);
        map.put("all4guid",list);
        return map;
    }

    /**
     * 获取对象的字段值
     * @param obj
     * @param name
     * @return
     */
    public static String getStrValue(Object obj, String name) {

        Class<?> rtClass = obj.getClass();
        Field[] fields = rtClass.getDeclaredFields();
        String value = "";

        for (Field field :fields){
            String varname = field.getName();
            if (name.equals(varname)){
                // 是否可以访问此属性
                boolean access = field.isAccessible();
                if (!access){
                    field.setAccessible(true);
                }
                try {
                    value = String.valueOf(field.get(obj));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
                if (!access){
                    field.setAccessible(false);
                }
                break;
            }
        }
        return value;
    }

    /**
     * 获取对象的List中的值
     * @param obj
     * @param list
     * @return
     * @throws IllegalAccessException
     */
    public static List getListValue(Object obj, List<String> list) throws IllegalAccessException {
        List lst = new ArrayList();

        Class<?> rtClass = obj.getClass();
        Field[] fields = rtClass.getDeclaredFields();

        for (String name :list){
            for (Field field :fields){
                String varname = field.getName();
                if (name.equals(varname)){
                    // 是否可以访问此属性
                    boolean access = field.isAccessible();
                    if (!access){
                        field.setAccessible(true);
                    }
                    if (varname.equalsIgnoreCase("rowguid") && isBlank((CharSequence) field.get(obj))){
                        try {
                            String fieldSetName = parSetName(field.getName());
                            Method fieldSetMet = null;
                            fieldSetMet = rtClass.getMethod(fieldSetName, field.getType());
                            fieldSetMet.invoke(obj, UUID.randomUUID().toString());
                        } catch (NoSuchMethodException | InvocationTargetException e) {
                            e.printStackTrace();
                        }
                    }
                    if (field.get(obj) == null){
                        lst.add("");
                    }
                    else {
                        lst.add(field.get(obj));
                    }
                    if (!access){
                        field.setAccessible(false);
                    }
                    break;
                }
            }
        }
        return lst;
    }

    /**
     * 通过键值对设置对象值
     * @param bean
     * @param map
     */
    public static void setValueByMap(Object bean, Map<String,String> map) {
        Class<?> cls = bean.getClass();
        Set<String> set = map.keySet();
        // 取出bean里的所有方法
        Method[] methods = cls.getDeclaredMethods();
        Field[] fields = cls.getDeclaredFields();
        for (Field field : fields) {
            try {
                String fieldSetName = parSetName(field.getName());
                if (!checkSetMet(methods, fieldSetName)) {
                    continue;
                }
                Method fieldSetMet = cls.getMethod(fieldSetName,
                        field.getType());
//				String fieldKeyName = parKeyName(field.getName());
                String fieldKeyName = field.getName();
                for (String str : set){
                    if (str.equals(fieldKeyName)){
                        String fieldType = field.getType().getSimpleName();
                        String value = map.get(str);
                        if (null != value && !"".equals(value)) {
                            if ("String".equals(fieldType)) {
                                fieldSetMet.invoke(bean, value);
                            } else if ("Date".equals(fieldType)) {
                                Date temp = parseDate(value);
                                fieldSetMet.invoke(bean, temp);
                            } else if ("Integer".equals(fieldType)
                                    || "int".equals(fieldType)) {
                                Integer intval = Integer.parseInt(value);
                                fieldSetMet.invoke(bean, intval);
                            } else if ("Long".equalsIgnoreCase(fieldType)) {
                                Long temp = Long.parseLong(value);
                                fieldSetMet.invoke(bean, temp);
                            } else if ("Double".equalsIgnoreCase(fieldType)) {
                                Double temp = Double.parseDouble(value);
                                fieldSetMet.invoke(bean, temp);
                            } else if ("Boolean".equalsIgnoreCase(fieldType)) {
                                Boolean temp = Boolean.parseBoolean(value);
                                fieldSetMet.invoke(bean, temp);
                            } else {
                                System.out.println("not supper type" + fieldType);
                            }
                        }
                    }
                }
            } catch (Exception e) {
                continue;
            }
        }
    }

    /**
     * 通过rs结果集设置对象值
     * @param bean
     * @param rs
     */
    public static void setValueByRs(Object bean, ResultSet rs) {
        if (rs != null){
            Class<?> cls = bean.getClass();
            // 取出bean里的所有方法
            Method[] methods = cls.getDeclaredMethods();
            Field[] fields = cls.getDeclaredFields();
            for (Field field : fields) {
                try {
                    String fieldSetName = parSetName(field.getName());
                    if (!checkSetMet(methods, fieldSetName)) {
                        continue;
                    }
                    Method fieldSetMet = cls.getMethod(fieldSetName,
                            field.getType());
//				String fieldKeyName = parKeyName(field.getName());
                    String fieldKeyName = field.getName();
                    String fieldType = field.getType().getSimpleName();
                    if ("String".equals(fieldType)) {
                        fieldSetMet.invoke(bean, rs.getString(fieldKeyName));
                    }
                    else if ("Date".equals(fieldType)) {
                        fieldSetMet.invoke(bean, rs.getDate(fieldKeyName));
                    }
                    else if ("Integer".equals(fieldType) || "int".equals(fieldType)) {
                        fieldSetMet.invoke(bean, rs.getInt(fieldKeyName));
                    }
                    else if ("Long".equalsIgnoreCase(fieldType)) {
                        fieldSetMet.invoke(bean, rs.getLong(fieldKeyName));
                    }
                    else if ("Double".equalsIgnoreCase(fieldType)) {
                        fieldSetMet.invoke(bean, rs.getDouble(fieldKeyName));
                    }
                    else if ("Boolean".equalsIgnoreCase(fieldType)) {
                        fieldSetMet.invoke(bean, rs.getBoolean(fieldKeyName));
                    }
                    else {
                        System.out.println("not supper type" + fieldType);
                    }
                } catch (Exception e) {
                    continue;
                }
            }
        }
    }

    /**
     * 取Bean的属性和值对应关系的MAP
     *
     * @param bean
     * @return Map
     */
    public static Map<String, String> getFieldValueMap(Object bean) {
        Class<?> cls = bean.getClass();
        Map<String, String> valueMap = new HashMap<String, String>();
        Method[] methods = cls.getDeclaredMethods();
        Field[] fields = cls.getDeclaredFields();
        for (Field field : fields) {
            try {
                String fieldType = field.getType().getSimpleName();
                String fieldGetName = parGetName(field.getName());
                if (!checkGetMet(methods, fieldGetName)) {
                    continue;
                }
                Method fieldGetMet = cls.getMethod(fieldGetName, new Class[] {});
                Object fieldVal = fieldGetMet.invoke(bean, new Object[] {});
                String result = null;
                if ("Date".equals(fieldType)) {
                    result = fmtDate((Date) fieldVal);
                } else {
                    if (null != fieldVal) {
                        result = String.valueOf(fieldVal);
                    }
                }
//				String fieldKeyName = parKeyName(field.getName());
                valueMap.put(field.getName(), result);
            } catch (Exception e) {
                continue;
            }
        }
        return valueMap;
    }

    /**
     * set属性的值到Bean
     *
     * @param bean
     * @param valMap
     */
    public static void setFieldValue(Object bean, Map<String, String> valMap) {
        Class<?> cls = bean.getClass();
        // 取出bean里的所有方法
        Method[] methods = cls.getDeclaredMethods();
        Field[] fields = cls.getDeclaredFields();

        for (Field field : fields) {
            try {
                String fieldSetName = parSetName(field.getName());
                if (!checkSetMet(methods, fieldSetName)) {
                    continue;
                }
                Method fieldSetMet = cls.getMethod(fieldSetName,
                        field.getType());
//				String fieldKeyName = parKeyName(field.getName());
                String  fieldKeyName = field.getName();
                String value = valMap.get(fieldKeyName);
                if (null != value && !"".equals(value)) {
                    String fieldType = field.getType().getSimpleName();
                    if ("String".equals(fieldType)) {
                        fieldSetMet.invoke(bean, value);
                    } else if ("Date".equals(fieldType)) {
                        Date temp = parseDate(value);
                        fieldSetMet.invoke(bean, temp);
                    } else if ("Integer".equals(fieldType)
                            || "int".equals(fieldType)) {
                        Integer intval = Integer.parseInt(value);
                        fieldSetMet.invoke(bean, intval);
                    } else if ("Long".equalsIgnoreCase(fieldType)) {
                        Long temp = Long.parseLong(value);
                        fieldSetMet.invoke(bean, temp);
                    } else if ("Double".equalsIgnoreCase(fieldType)) {
                        Double temp = Double.parseDouble(value);
                        fieldSetMet.invoke(bean, temp);
                    } else if ("Boolean".equalsIgnoreCase(fieldType)) {
                        Boolean temp = Boolean.parseBoolean(value);
                        fieldSetMet.invoke(bean, temp);
                    } else {
                        System.out.println("not supper type" + fieldType);
                    }
                }
            } catch (Exception e) {
                continue;
            }
        }
    }

    /**
     * 格式化string为Date
     *
     * @param datestr
     * @return date
     */
    public static Date parseDate(String datestr) {
        if (null == datestr || "".equals(datestr)) {
            return null;
        }
        try {
            String fmtstr = null;
            if (datestr.indexOf(':') > 0) {
                fmtstr = "yyyy-MM-dd HH:mm:ss";
            } else {
                fmtstr = "yyyy-MM-dd";
            }
            SimpleDateFormat sdf = new SimpleDateFormat(fmtstr, Locale.UK);
            return sdf.parse(datestr);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 日期转化为String
     *
     * @param date
     * @return date string
     */
    public static String fmtDate(Date date) {
        if (null == date) {
            return null;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss",
                    Locale.US);
            return sdf.format(date);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 判断是否存在某属性的 set方法
     *
     * @param methods
     * @param fieldSetMet
     * @return boolean
     */
    public static boolean checkSetMet(Method[] methods, String fieldSetMet) {
        for (Method met : methods) {
            if (fieldSetMet.equals(met.getName())) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断是否存在某属性的 get方法
     *
     * @param methods
     * @param fieldGetMet
     * @return boolean
     */
    public static boolean checkGetMet(Method[] methods, String fieldGetMet) {
        for (Method met : methods) {
            if (fieldGetMet.equals(met.getName())) {
                return true;
            }
        }
        return false;
    }

    /**
     * 拼接某属性的 get方法
     *
     * @param fieldName
     * @return String
     */
    public static String parGetName(String fieldName) {
        if (null == fieldName || "".equals(fieldName)) {
            return null;
        }
        int startIndex = 0;
        if (fieldName.charAt(0) == '_')
            startIndex = 1;
        return "get"
                + fieldName.substring(startIndex, startIndex + 1).toUpperCase()
                + fieldName.substring(startIndex + 1);
    }

    /**
     * 拼接在某属性的 set方法
     *
     * @param fieldName
     * @return String
     */
    public static String parSetName(String fieldName) {
        if (null == fieldName || "".equals(fieldName)) {
            return null;
        }
        int startIndex = 0;
        if (fieldName.charAt(0) == '_')
            startIndex = 1;
        return "set"
                + fieldName.substring(startIndex, startIndex + 1).toUpperCase()
                + fieldName.substring(startIndex + 1);
    }

    /**
     * 获取存储的键名称（调用parGetName）
     *
     * @param fieldName
     * @return 去掉开头的get
     */
    public static String parKeyName(String fieldName) {
        String fieldGetName = parGetName(fieldName);
        if (fieldGetName != null && fieldGetName.trim() != ""
                && fieldGetName.length() > 3) {
            return fieldGetName.substring(3);
        }
        return fieldGetName;
    }

    /**
     * 根据sql 获取json对象
     * @param sql
     * @return
     */
    public static JSONArray getSqlJsonArray(String sql){
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;

        JSONArray arr = new JSONArray();
        try {
            pst = conn.prepareStatement(sql);
            rs = pst.executeQuery();

            ResultSetMetaData data = rs.getMetaData();
            while(rs.next()) {
                JSONObject obj = new JSONObject();
                for (int i = 0; i < data.getColumnCount(); i++){
                    obj.put(data.getColumnName(i + 1),rs.getString(i + 1));
                }
                arr.add(obj);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return arr;
    }

    public static int getSqlUpdateNum(String sql){
        Connection conn = JDBCUtils.getConnection();
        PreparedStatement pst = null;
        ResultSet rs = null;
        int num = 0;

        try {
            conn.setAutoCommit(false);

            pst = conn.prepareStatement(sql);
            num = pst.executeUpdate();

            conn.commit();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            JDBCUtils.closeConnection(conn, pst, rs);
        }
        return num;
    }

    public static String md5Hex(String string){
        return  DigestUtils.md5DigestAsHex((string).getBytes());
    }

    // 加密方法
    private static SecretKey secretKeySpec;

    static {
        try {
            secretKeySpec = generateKey();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static SecretKey generateKey() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        SecureRandom secureRandom = new SecureRandom();
        keyGenerator.init(256, secureRandom);
        SecretKey key =keyGenerator.generateKey();
        String keyString = Base64.getEncoder().encodeToString(key.getEncoded());
        return key;
    }

    public static String encrypt(String data, String key) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
        byte[] encryptedBytes = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }
    public static String encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
        byte[] encryptedBytes = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    // 解密方法
    public static String decrypt(String encryptedData, String key) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes);
    }

    public static String decrypt(String encryptedData) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes);
    }

}
