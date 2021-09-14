/*
 * @Author: zeHua
 * @Date: 2021-09-09 09:07:00
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-13 16:55:36
 * @FilePath: /yd-admin/src/components/Form/components/formUtils.js
 */

/**
 * @description 重构form 表单数据 调用api 格式options
 * @param {*} value   form 表单数据
 */
export function refactorFormData(value, callback) {
    let data = []
    // getList
    // for (let i = 0; i < value.length; i++) {

    // if (value[i].componentProps && value[i].componentProps.api) {
    value.api().then(res => {
        let apiformdata = value.apiFormat.split('.')
        for (let t = 0; t < apiformdata.length; t++) {
            res = res[apiformdata[t]]
        }
        value.options = res
        // if (value && value.optionsFormat) {
        //     value.options = formDataFormOptions(value.options, value.optionsFormat)
        // }
        // console.log(value.options)
        // callback(value)
        console.log(value)
        return value

    })
    // }

    // console.log(value[i].componentProps.options)
    // }

}

export function formDataFormOptions(Arraydata, keyMap) {
    console.log(Arraydata)
    for (var i = 0; i < Arraydata.length; i++) {
        var obj = Arraydata[i]

        // for (var key in obj) {

        // }
        for (var key in obj) {
            // console.log(keyMap[key])
            for (let keys in keyMap) {
                if (key === keyMap[keys]) {
                    obj[keys] = obj[key]
                    delete obj[key]
                    // console.log(obj[keys])
                    // console.log()
                }
            }
        }
        //     console.log(key)
        //     console.log(keyMap)
        //     var newKey = keyMap[key]
        //     if (newKey) {
        //         obj[newKey] = obj[key]
        //         delete obj[newKey]
        //     }
        // }
    }

    return Arraydata
}

export function deepCopy(obj) {
    // hash表，记录所有的对象的引用关系
    let map = new WeakMap()

    function dp(obj) {
        let result = null
        let keys = Object.keys(obj)
        let key = null,
            temp = null,
            existobj = null

        existobj = map.get(obj)
        //如果这个对象已经被记录则直接返回
        if (existobj) {
            return existobj
        }

        result = {}
        map.set(obj, result)

        for (let i = 0, len = keys.length; i < len; i++) {
            key = keys[i]
            temp = obj[key]
            if (temp && typeof temp === 'object') {
                result[key] = dp(temp)
            } else {
                result[key] = temp
            }
        }
        return result
    }


    return dp(obj)
}