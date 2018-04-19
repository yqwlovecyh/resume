const sdkApi = require('../../services/sdk.js')

Page({
    data: {
        otherInfo: [
            {
                title0: 'title',
                content0: ''
            }
        ]
    },
    onLoad: function () {
        this.findOtherkInfo()
    },
    findOtherkInfo: function (e) {
        sdkApi.findOtherkInfo({}, res=> {
            console.log('findOtherkInfo------------init---res', res)
            if (res.objects.length > 0) {
                if (res.objects[0].id) {
                    this.setData({
                        'recordId': res.objects[0].id
                    })
                }
                let titleArray = []
                let contentArray = []
                for (let i in res.objects[0]) { // loop througth the object
                    if (i.substr(0, 5) === 'title') {
                        titleArray.push({[i]: res.objects[0][i]})
                    }
                    if (i.substr(0, 7) === 'content') {
                        contentArray.push({[i]: res.objects[0][i]})
                    }
                }

                titleArray.forEach((val, index) => { // There are problem with the data order.It't hasn't been solved yet. -- Waiting for optimization
                    Object.assign(val, contentArray[index])
                })

                this.setData({
                    'otherInfo': titleArray
                })
            } else {
                this.setData({
                    'otherInfo': [{
                        nullData: true
                    }]
                })
            }
            
            console.log('otherInfo--------------666-----@_@', this.data.otherInfo)
        })
    },
})