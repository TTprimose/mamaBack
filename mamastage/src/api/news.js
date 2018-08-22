import HttpClient from '../utils/HttpClient';
export default {
    getnewslist(data) {
        return HttpClient.get('/news/list', data);
    },
    getnewsid(id) {
        return HttpClient.get(`/news/${id}`);
    },
    postnewsadd(data) {
        return HttpClient.post('/news/add', data);
    },
    deletenewsdeleteid(id) {
        return HttpClient.delete(`/news/delete/${id}`);
    },
    putnewsupdate(data) {
        return HttpClient.putform('/news/update', data);
    }
}
