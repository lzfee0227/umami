import { isSufyMain } from 'lib/oem';
import { useWebsite } from './useWebsite';

export function useIsSufyMain(websiteId: string | undefined | null): boolean | undefined {
  const website = useWebsite(websiteId).data;

  if (!websiteId) {
    return;
  }

  const domain: string = (website as any)?.domain || ''; // 原本的类型就很有问题…

  if (!domain) {
    return;
  }

  return isSufyMain(domain);
}

export default useIsSufyMain;
