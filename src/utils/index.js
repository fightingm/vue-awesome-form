import Vue from "vue";

export const EventBus = new Vue();

// 根据propertyOrder 从小到大排序
export function orderProperty(obj) {
    // 先遍历对象，生成数组
    // 对数组排序
    const keys = Object.keys(obj);
    // 如果对象只有一个字段，不需要排序
    if(keys.length <= 1) return obj;
    return keys.map(key => {
        return {
            key,
            val: obj[key]
        };
    }).sort((pre, cur) => {
        return (pre.val.propertyOrder || 999) - (cur.val.propertyOrder || 999);
    });
}

export function cloneDeep(source) {
    // 只适用于对象中没有函数
    return JSON.parse(JSON.stringify(source));
    // var type = Object.prototype.toString.call(source);
    // let obj;
    // if(type === '[object Array]'){
    //     obj = [];
    // } else if(type === '[object Object]'){
    //     obj = {};
    // } else {
    //     //不再具有下一层次
    //     return source;
    // }
    // if(type === '[object Array]'){
    //     for(let i = 0, len = source.length; i < len; i++){
    //         obj.push(this.cloneDeep(source[i]));
    //     }
    // } else if(type === '[object Object]'){
    //     for(let key in source){
    //         obj[key] = this.cloneDeep(source[key]);
    //     }
    // }
    // return obj;
}
