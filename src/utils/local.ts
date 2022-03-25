/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2021-05-25 17:34:08
 * @LastEditTime: 2022-03-24 11:01:05
 * @LastEditors: Please set LastEditors
 * @Description:
 */
/**
 *  保存LocalStorage
 *  @param    {String}    key
 *  @param    {String}    value
 */
export const SetLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 *  获取LocalStorage
 *  @param    {String}    key
 *  @returns  {Object|String}
 */
export const GetLocalStorage = (key: string): any => {
  if (!key) return false;

  const value = localStorage.getItem(key);

  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log('error: ', error);
      return value;
    }
  }

  return '';
};

/**
 *  删除LocalStorage
 *  @param    {String}
 */
export const RemoveLocalStorage = (key: string) => {
  if (!key) return;

  localStorage.removeItem(key);
};

/**
 *  删除全部LocalStorage
 */
export const RemoveAllLocalStorage = () => {
  localStorage.clear();
};
