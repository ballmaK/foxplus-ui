import request from '/@/utils/request';

/**列表 */
export function fetchList(query?: Object) {
	return request({
		url: '/foxplus-app-backend/appStockArticle/page',
		method: 'get',
		params: query,
	});
}
/**新增 */
export function addObj(obj?: Object) {
	return request({
		url: '/foxplus-app-backend/appStockArticle',
		method: 'post',
		data: obj,
	});
}
/**修改 */
export function putObj(obj?: Object) {
	return request({
		url: '/foxplus-app-backend/appStockArticle',
		method: 'put',
		data: obj,
	});
}
/**详情 */
export function getObj(id?: string) {
	return request({
		url: '/foxplus-app-backend/appStockArticle/' + id,
		method: 'get',
	});
}
/**删除 */
export function delObjs(ids?: Object) {
	return request({
		url: '/foxplus-app-backend/appStockArticle',
		method: 'delete',
		data: ids,
	});
}
