export function isSufyMain(domain: string) {
  // TODO: 移除测试环境专用逻辑
  return domain.toLowerCase().includes('sufy') && !domain.includes('sufy-env-user');
}
