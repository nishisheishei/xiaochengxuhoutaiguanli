import request from '@/utlis/requery'

// 登录页面中 点击登录按钮
export const loginClickData = query => {
    return request({
        method: 'GET',
        url: '/api/login',
        params: query
    })
}

// publish 页面中的  加载视频类型 
export const postLoadVoideType = data => {
    return  request({
        method: 'POST',
        url: '/api/voideType/loadVoideType',
        data: data
    })
}

// 短片查询（支持模糊搜索）
export const postFindVoide = data => {
    return  request({
        method: 'POST',
        url: '/api/voide/findVoide',
        data: data
    })
}

// 删除按钮
export const postDeleteVoide = data => {
    return request({
        method: 'POST',
        url: '/api/voide/deleteVoide',
        data: data
    })
}

// 保存按钮
export const updateVoide  = data => {
    return request({
        method: 'POST',
        url: '/api/voide/updateVoide',
        data: data
    })
}

// increase页面中的添加按钮
export const postInsertVoide  = data => {
    return request({
        method: 'POST',
        url: '/api/voide/insertVoide',
        data: data
    })
}

// classify 页面中 页面加载显示数据
export const postFindVoideType  = data => {
    return request({
        method: 'POST',
        url: '/api/voideType/findVoideType',
        data: data
    })
}

//classify 页面中 新增
export const addInsertVoideType = data => {
	return request({
		method: 'POST',
		url: '/api/voideType/insertVoideType',
		data
	})
}

//classify 页面中 编辑
export const postUpdateVoideType = data => {
	return request({
		method: 'POST',
		url: '/api/voideType/updateVoideType',
		data
	})
}
//classify 页面中  删除
export const deleteInsertVoideType = data => {
	return request({
		method: 'POST',
		url: '/api/voideType/deleteVoideType',
		data
	})
}