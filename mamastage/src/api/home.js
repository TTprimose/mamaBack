import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    saveData(data){
        return HttpClient.post(BaseUrl.login, data);
    }
}
