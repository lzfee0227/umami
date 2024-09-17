import { useApi, useDateRange } from 'components/hooks';

export function useEventNames(websiteId: string) {
  const [dateRange] = useDateRange(websiteId);
  const { startDate, endDate } = dateRange; // TODO: modified 参数？同其他
  const { get, useQuery } = useApi();
  const { data, error, isLoading } = useQuery(
    ['event: get event names', { websiteId, startDate, endDate }],
    () =>
      get('/event/names', {
        websiteId,
        startAt: +startDate,
        endAt: +endDate,
      }),
    { enabled: !!(websiteId && startDate && endDate) },
  );

  return { data, error, isLoading }; // TODO: data 排序？同其他
}

export function useEventFieldNames(websiteId: string, eventName?: string) {
  const [dateRange] = useDateRange(websiteId);
  const { startDate, endDate } = dateRange;
  const { get, useQuery } = useApi();
  const { data, error, isLoading } = useQuery(
    ['event: get event field names', { websiteId, startDate, endDate }],
    () =>
      get('/event/field-names', {
        websiteId,
        startAt: +startDate,
        endAt: +endDate,
        event: eventName,
      }),
    { enabled: !!(websiteId && startDate && endDate) },
  );

  return { data, error, isLoading };
}
