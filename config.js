let baseUrl = 'http://120.27.21.136:2798/';
let ajax = function (methos, url, onload, param) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, baseUrl + url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onload = function (res) {
        let resultObject = JSON.parse(res.currentTarget.responseText);
    }
    xhr.send(param);
}
