'use client';

import { useIsSufyMain } from '../base';
import EventDataDetailMain from './Main';

export default function WebsiteEventDataPage({ params }) {
  const id: string | undefined = params.id;

  const isSufyMain = useIsSufyMain(id);

  if (!id) {
    return null;
  }

  if (!isSufyMain) {
    return null;
  }

  return <EventDataDetailMain websiteId={id} />;
}
