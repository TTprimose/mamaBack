import HttpClient from '../utils/HttpClient';
export default {
    getcaselist(data) {
        return HttpClient.get('/case/list', data);
    },
    getcaseid(id) {
        return HttpClient.get(`/case/${id}`);
    },
    postcaseadd(data) {
        return HttpClient.post('/case/add', data);
    },
    deletecasedeleteid(id) {
        return HttpClient.delete(`/case/delete/${id}`);
    },
    putcaseupdate(data) {
        return HttpClient.putform('/case/update', data);
    },


    // 登陆登出API
    postuserlogin(data) {
        return HttpClient.post('/user/login', data);
    },
    getuserlogout() {
        return HttpClient.get('/user/logout');
    }
}
