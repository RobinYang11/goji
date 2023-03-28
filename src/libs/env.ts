/**
 * 是否是开发环境
 */
export function isDevMode(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * 是否是生产环境
 */
export function isProdMode(): boolean {
  return process.env.NODE_ENV === 'production';
}
