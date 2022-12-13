// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

class StorageUtil {

    /**
     * 获取
     * @param key
     * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
     */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            // console.log("get----------------------------"+value)
            // const jsonValue = value;
            return jsonValue;
        });
    }

    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
        // console.log("save----------------------------"+value)
        // return AsyncStorage.setItem(key, value);
    }

    /**
     * 更新
     * @param key
     * @param value
     * @returns {*}
     */
    static update(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * 删除
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

    /**
     * 删除所有配置数据
     * @returns {Promise<string>}
     */
    static clear() {
        return AsyncStorage.clear();
    }

}

export default StorageUtil;