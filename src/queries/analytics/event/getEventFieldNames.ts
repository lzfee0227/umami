import prisma from 'lib/prisma';
import { PRISMA, runQuery } from 'lib/db';
import { QueryFilters, WebsiteEventData } from 'lib/types';

export async function getEventFieldNames(
  ...args: [websiteId: string, filters: QueryFilters]
): Promise<WebsiteEventData[]> {
  return runQuery({
    [PRISMA]: () => relationalQuery(...args),
  });
}

async function relationalQuery(websiteId: string, filters: QueryFilters) {
  const { rawQuery, parseFilters } = prisma;
  const { event } = filters;
  const { params } = await parseFilters(websiteId, filters);

  if (event != null) {
    const eventStr = event === '' ? `is null` : `= {{event}}`;
    return rawQuery(
      `
      select
        event_data.event_key as "fieldName",
        count(*) as "total"
      from event_data
      inner join website_event
        on website_event.event_id = event_data.website_event_id
      where event_data.website_id = {{websiteId::uuid}}
        and event_data.created_at between {{startDate}} and {{endDate}}
        and website_event.event_name ${eventStr}
      group by event_data.event_key
      order by event_data.event_key asc
      `,
      params,
    );
  }

  return rawQuery(
    `
    select event_key as fieldName
    from event_data
    where website_id = {{websiteId::uuid}}
      and created_at between {{startDate}} and {{endDate}}
    group by event_key
    order by event_key asc
    `,
    params,
  );
}
