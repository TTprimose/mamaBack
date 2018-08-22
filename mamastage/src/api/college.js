import HttpClient from '../utils/HttpClient';
export default {
    // 公开课列表
    getClassList(data) {
        return HttpClient.get('/college/list', data)
    },
    // 公开课详情
    getClassDetail(id) {
        return HttpClient.get(`/college/${id}`)
    },
    // 新增公开课
    addClass(data) {
        return HttpClient.post('/college/add', data)
    },
    // 修改公开课
    editClass(data) {
        return HttpClient.putform('/college/update', data)
    },
    // 删除公开课
    deleteClass(id) {
        return HttpClient.delete(`/college/delete/${id}`)
    },
    // 学员反馈列表
    getFeedbackList(data) {
        return HttpClient.get('/feedback/list', data)
    },
    // 新增反馈
    addFeedback(data) {
        return HttpClient.post('/feedback/add', data)
    },
    // 修改学员反馈
    editFeedback(data) {
        return HttpClient.putform('/feedback/update', data)
    },
    // 删除学员反馈
    delFeedback(id) {
        return HttpClient.delete(`/feedback/delete/${id}`)
    }
}
