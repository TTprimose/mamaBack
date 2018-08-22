import HttpClient from '../utils/HttpClient';
export default {
    postImg(data) {
        return HttpClient.post('/f/upload', data)
    },
    getCaseList(data) {
        return HttpClient.get('/case/list', data)
    },
    // 关于我们列表
    getAboutList(data) {
        return HttpClient.get('/about/list', data)
    },
    // 修改关于我们
    editAbout(data) {
        return HttpClient.putform('/about/update', data)
    },
    // 获取发展历程列表
    getDevelopList(data) {
        return HttpClient.get('/development/list', data)
    },
    // 新增发展历程
    addDevelop(data) {
        return HttpClient.post('/development/add', data)
    },
    // 修改发展历程
    editDevelop(data) {
        return HttpClient.putform('/development/update', data)
    },
    // 删除发展历程
    deleteDevelop(id) {
        return HttpClient.delete(`/development/delete/${id}`)
    },
    // 获取核心团队列表
    getTeamList(data) {
        return HttpClient.get('/team/list', data)
    },
    // 修改核心团队
    updateTeam(data) {
        return HttpClient.putform('/team/update', data)
    },
    // 删除团队
    deleteTeam(id) {
        return HttpClient.delete(`/team/delete/${id}`)
    },
    // 新增团队
    addTeam(data) {
        return HttpClient.post('/team/add', data)
    },
    // 获取战略合作伙伴列表
    getPartnerList(data) {
        return HttpClient.get('/partner/list', data)
    },
    // 修改战略合作伙伴
    editPartner(data) {
        return HttpClient.putform('/partner/update', data)
    },
    // 新增战略合作伙伴
    addPartner(data) {
        return HttpClient.post('/partner/add', data)
    },
    // 删除战略合作伙伴
    deletePartner(id) {
        return HttpClient.delete(`/partner/delete/${id}`)
    },
    // 获取企业文化
    getCulture() {
        return HttpClient.get('/culture/list')
    },
    // 修改企业文化
    editCulture(data) {
        return HttpClient.putform('/culture/update', data)
    },
    // 获取特色优势
    getFuture() {
        return HttpClient.get('/feature/list')
    },
    // 修改特色优势
    editFuture(data) {
        return HttpClient.putform('/feature/update', data)
    }
}
