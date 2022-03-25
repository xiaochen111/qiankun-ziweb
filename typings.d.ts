/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-24 10:06:23
 * @Description:
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;

  export default url;
}
