import { Message } from 'element-ui';

export default {
  response: [
    function (response) {
      if (response.status !== 200) {
        return Promise.reject(response);
      } else {
        if (response.data.status && response.data.status !== 101) {
          Message({
            type: 'error',
            message: response.data.msg || ''
          });
          return Promise.reject(response);
        }
        if (response.data.data == null) {
          response.data.data = {};
        }
        response.data.data.o = JSON.parse(JSON.stringify(response.data));
        return response.data;
      }
    }
  ]
};
