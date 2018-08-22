import HttpClient from '../utils/HttpClient';
export default {
    // 部门
    getdepartmentlist(data) {
        return HttpClient.get('/department/list', data);
    },
    postdepartmentadd(data) {
        return HttpClient.post('/department/add', data);
    },
    putdepartmentupdate(data) {
        return HttpClient.put('/department/update', data);
    },
    deletedepartmentdeleteid(id) {
        return HttpClient.delete(`/department/delete/${id}`);
    },

    // 招聘
    getjoinlist(data) {
        return HttpClient.get('/join/list', data);
    },
    postjoinadd(data) {
        return HttpClient.post('/join/add', data);
    },
    putjoinupdate(data) {
        return HttpClient.put('/join/update', data);
    },
    deletejoindeleteid(id) {
        return HttpClient.delete(`/join/delete/${id}`);
    },
    getjoinid(id) {
        return HttpClient.get(`/join/${id}`);
    },
    deletejoinisopen(data) {
        return HttpClient.put('/join/isopen', data);
    }
}
