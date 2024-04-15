'use client'; // TODO: 检查是否安全

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useIsSufyMain, useNavigation } from 'components/hooks';
import Empty from 'components/common/Empty';

import WebsiteHeader from '../WebsiteHeader';
import WebsiteEventData from './WebsiteEventData';

export default function WebsiteEventDataPage({ params: { id } }) {
  const router = useRouter();
  const {
    query: { raw, event },
  } = useNavigation();

  const isSufyMain = useIsSufyMain(id);

  useEffect(() => {
    if (id && isSufyMain && raw == null) {
      router.push(`/websites/${id}/event` + (event ? `?event=${encodeURIComponent(event)}` : ''));
    }
  }, [isSufyMain, raw, id, event, router]);

  if (!id) {
    return null;
  }

  return (
    <>
      <WebsiteHeader websiteId={id} />
      {/* TODO: 后续放开 oem 部分查阅权限 */}
      {isSufyMain ? <WebsiteEventData websiteId={id} /> : <Empty />}
    </>
  );
}
