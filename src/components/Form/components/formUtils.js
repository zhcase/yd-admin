
/**
 * @description 重构form 表单数据 调用api 格式options
 * @param {*} value   form 表单数据
 */
export function refactorFormData(value) {
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
        if (value && value.optionsFormat) {
            value.options = formDataFormOptions(value.options, value.optionsFormat)
        }
    })
    // }

    // console.log(value[i].componentProps.options)
    // }
    return value
}

export function formDataFormOptions(Arraydata, keyMap) {
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