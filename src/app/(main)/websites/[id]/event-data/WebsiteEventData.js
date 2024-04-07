'use client';
import { useMemo } from 'react';
import { Flexbox, Loading } from 'react-basics';
import { useIsSufyMain, getBaseEvents } from './base';
import EventDataTable from './EventDataTable';
import EventDataValueTable from './EventDataValueTable';
import { EventDataMetricsBar } from './EventDataMetricsBar';
import { useDateRange, useApi, useNavigation } from 'components/hooks';
import styles from './WebsiteEventData.module.css';

function useData(websiteId, event) {
  const [dateRange] = useDateRange(websiteId);
  const { startDate, endDate } = dateRange;
  const { get, useQuery } = useApi();
  const { data, error, isLoading } = useQuery(
    ['event-data:events', { websiteId, startDate, endDate, event }],
    () =>
      get('/event-data/events', {
        websiteId,
        startAt: +startDate,
        endAt: +endDate,
        event,
      }),
    { enabled: !!(websiteId && startDate && endDate) },
  );

  return { data, error, isLoading };
}

export default function WebsiteEventData({ websiteId }) {
  const {
    query: { event },
  } = useNavigation();
  const { data: events, isLoading } = useData(websiteId, event);

  const isSufyMain = useIsSufyMain(websiteId);
  const data = useMemo(() => {
    if (!events) {
      return events;
    }

    return (isSufyMain ? events : getBaseEvents(events)).map(event => ({
      ...event,
      eventName: event.eventName || 'views', // 顺便展示了 PV 对应的自定义字段数据
    }));
  }, [events, isSufyMain]);

  return (
    <Flexbox className={styles.container} direction="column" gap={20}>
      <EventDataMetricsBar websiteId={websiteId} />
      {!event && <EventDataTable data={data} />}
      {isLoading && <Loading position="page" />}
      {event && data && <EventDataValueTable event={event} data={data} />}
    </Flexbox>
  );
}
