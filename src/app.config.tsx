/* eslint-disable guard-for-in */
import { Button, message, notification, Space } from 'antd';
import { history } from 'umi';
import type { RequestOptionsInit } from 'umi-request/types';
import type { ResponseResultType } from './service/interface';
import { GetLocalStorage, SetLocalStorage } from './utils/local';

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  413: '文件大小超出了服务器端的限制大小。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
export const errorHandler = (error: { response: Response }) => {
  console.log('error: ', error);
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if (Number(status) === 401) {
      message.info('请重新登录');
      console.log('请重新登录');
      // history.push('/login');
      window.history.pushState({}, '', '/login');
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
  }
  // else if (!response) {
  //   notification.error({
  //     description: '您的网络发生异常，无法连接服务器',
  //     message: '网络异常',
  //   });
  // }
  return response || {};
};

/** 初始版本 */
const INIT_VERSION = '1.0.0';
const versionBtns = (
  <Space>
    <Button
      onClick={() => {
        notification.close('version');
        SetLocalStorage('version', INIT_VERSION);
      }}
    >
      取消
    </Button>
    <Button
      type="primary"
      onClick={() => {
        window.location.reload();
      }}
    >
      确定
    </Button>
  </Space>
);

export const responseInterceptors = async (response: any) => {
  if (response.status === 401) {
    message.warning('用户认证已过期，请先登录');
    // history.push('/login');
    window.history.pushState({}, '', '/login');
    return {};
  }
  const contentType = response.headers.get('Content-Type');
  const contentDisposition = response.headers.get('content-disposition');

  if (contentType && contentType.match(/application\/json/i)) {
    const content: ResponseResultType = await response.clone().json();
    const { success, msg, code, version } = content;
    const currentVersion = GetLocalStorage('version') || INIT_VERSION;

    if (version && version !== '0' && version !== currentVersion) {
      notification.open({
        message: '系统升级',
        description: '当前已发布新的版本，请刷新页面进行版本升级',
        duration: 0,
        key: 'version',
        onClose: () => {
          SetLocalStorage('version', INIT_VERSION);
        },
        btn: versionBtns,
      });
      SetLocalStorage('version', version || INIT_VERSION);
    }

    if (code === '401' || code === 401) {
      if (history.location.pathname !== '/login') {
        message.warning('用户认证已过期，请先登录');
      }
      // history.push('/login');
      window.history.pushState({}, '', '/login');
      return {};
    }

    if (!success) {
      notification.warn({
        message: msg || '后台处理有错误结果',
      });
      return response;
    }
  }
  if (contentDisposition) {
    const blob: Blob = await response.clone().blob();
    let fileName = String(contentDisposition).replace(/attachment;(\s+)?filename=/, '');

    fileName = decodeURI(fileName);
    return {
      fileName,
      blob,
    };
  }
  return response;
};

export const requestInterceptors = (url: string, options: RequestOptionsInit) => {
  const headers = options.headers;
  const token = {
    ...(GetLocalStorage('token') ? { Authorization: GetLocalStorage('token') } : {}),
  };

  const authHeader = {
    ...token,
    ...headers,
  };

  if (options.method?.toUpperCase() === 'UPLOAD') {
    const formData = new FormData();

    // eslint-disable-next-line no-restricted-syntax
    for (const i in options.data) {
      formData.append(i, options.data[i]);
    }

    return {
      url,
      options: {
        method: 'POST',
        body: formData,
        skipErrorHandler: true,
        headers: authHeader,
      },
    };
  }

  if (options.method?.toUpperCase() === 'GET') {
    Object.assign(authHeader, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });
    return {
      url,
      options: {
        ...options,
        skipErrorHandler: true,
        headers: authHeader,
      },
    };
  }

  return {
    url,
    options: { ...options, skipErrorHandler: true, headers: authHeader },
  };
};
