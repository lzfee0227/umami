'use client';

import { useIsSufyMain } from 'components/hooks';

import EventDashboard from './Main';

export default function WebsiteEventDashboard({ params }) {
  const id: string | undefined = params.id;

  const isSufyMain = useIsSufyMain(id);

  if (!id) {
    return null;
  }

  if (!isSufyMain) {
    return null;
  }

  return <EventDashboard websiteId={id} />;
}
