const api = process.env.NODE_ENV === 'development' ?
    // '/api' : '' 开发模式走得代理
    '/api' : 'http://musicapi.h5sm.com'

export default api