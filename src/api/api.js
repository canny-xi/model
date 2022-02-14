import http from "axios";
import qs from "qs";
import Vue from "vue";
//请求带上cookie
// http.defaults.withCredentials = true;
let obj = window.location.href;
let index = obj.lastIndexOf("#");
obj = obj.substring(0, index);
if (
  window.location.href.indexOf("192.168") >= 0 ||
  obj.indexOf("192") >= 0 ||
  obj.indexOf("localhost") >= 0
) {
  var base = "http://192.168.1.170:80"; //商品
  Vue.prototype.base = "http://192.168.1.170:80"; //测试接口地址
  Vue.prototype.link = "http://192.168.1.184"; //测试跳转地址
} else {
  var base = "https://newapi.hezongyy.com"; //直播
  Vue.prototype.base = "https://newapi.hezongyy.com"; //正式服接口地址
  Vue.prototype.link = "https://www.hezongyy.com"; //正式跳转地址
}

const makeUrl = function (url, params) {
  let newParams = { ...params };
  let reg = /\:(\w+)/g;
  url = url.replace(reg, (match, key) => {
    delete newParams[key];
    return params[key];
  });
  return { url, params: newParams };
};
const doPost = function (u) {
  return function (p = {}) {
    let { url, params } = makeUrl(u, p);
    return params
      ? http.post(`${base}/${url}`, params)
      : http.post(`${base}/${url}`);
  };
};
const doGet = function (u) {
  return function (p = {}) {
    let { url, params } = makeUrl(u, p);
    return params
      ? http.get(`${base}/${url}`, { params: params })
      : http.get(`${base}/${url}`);
  };
};

function getTokenByLocal() {
  let hesytoken =
    localStorage.getItem("token") || "7e474bda-3dd4-11ec-87de-506b8d76caa6";
  return hesytoken;
}
//设置request请求拦截器**
http.interceptors.request.use(
  (config) => {
    if (getTokenByLocal()) {
      config.headers["hesytoken"] = getTokenByLocal(); //让每个请求携带自定义的token
      // config.headers['ContentType'] = 'application/from-data;charset=utf-8'    //后台接收参数的类型
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//返回拦截器
http.interceptors.response.use(function (res) {
  return res.data;
});
let api = {
  post1: doPost("xxxxxx"),
  get1: doGet("xxxxxx"),
};

export default api;
