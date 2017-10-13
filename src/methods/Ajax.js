import axios from 'axios';
const HTTP = 'http://localhost/admin'; //域名
class Ajax {
	/*2017-03-11 守夜人
	 * 参数说明：url:必需，链接，params：必需，请求体，
	 *          success：必需，请求成功回调函数，
	 *          error:可选，请求失败（header不是200）回调函数，不传将使用默认失败回调
	 *          _default：可选，是否使用默认success函数，当传入值为true时，参数的success将作为code=0时的回调；
	 */
	get(url, params, success, error = this.error, _default) {
		axios.get(HTTP + url, {
			params: params
		}).then((res) => {
			if(_default === true) {
				this.success(res, success(res));
			} else {
				success(res)
			}
		}).catch((err) => error());
	}
	post(url, data, success, error = this.error, _default) {
		axios.post(HTTP + url, data).then((res) => {
			if(_default) {
				this.success(res, success(res));
			} else {
				success(res)
			}
		}).catch((err) => error());
	}
	success(res, callback) {
		//默认请求成功回调
		let data = JSON.parse(res.body);
		if(data.code == 0) {
			callback();
		} else if(data.code == 2) {

		} else {
			alert(data.msg);
		}
	}
	error(error) {
		//默认请求失败回调
		alert('我能怎么办，我也很绝望啊！');
	}
}
export default Ajax;