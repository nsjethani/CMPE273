package com.entity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public class FileData {
    String status;
    List listdata;
    String strData;
    List files;
    List staredList;

    public List getFiles() {
        return files;
    }

    public void setFiles(List files) {
        this.files = files;
    }

    public List getStaredList() {
        return staredList;
    }

    public void setStaredList(List staredList) {
        this.staredList = staredList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List getListdata() {
        return listdata;
    }

    public void setListdata(List listdata) {
        this.listdata = listdata;
    }

    public String getStrData() {
        return strData;
    }

    public void setStrData(String strData) {
        this.strData = strData;
    }
}
