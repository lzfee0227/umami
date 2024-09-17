'use client'; // TODO: 收拢细化各查询接口的具体权限

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useNavigation } from 'components/hooks';

export default function WebsiteEventPage({ params: { id } }) {
  const router = useRouter();
  const {
    query: { event },
  } = useNavigation();

  useEffect(() => {
    if (id) {
      router.push(
        `/websites/${id}/event/dashboard` + (event ? `?event=${encodeURIComponent(event)}` : ''),
      );
    }
  }, [id, event, router]);

  return null;
}
