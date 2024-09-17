import prisma from 'lib/prisma';
import { PRISMA, runQuery } from 'lib/db';
import { QueryFilters, WebsiteEventData } from 'lib/types';

export async function getEventNames(
  ...args: [websiteId: string, filters: QueryFilters]
): Promise<WebsiteEventData[]> {
  return runQuery({
    [PRISMA]: () => relationalQuery(...args),
  });
}

async function relationalQuery(websiteId: string, filters: QueryFilters) {
  const { rawQuery, parseFilters } = prisma;
  const { params } = await parseFilters(websiteId, filters);

  return rawQuery(
    `
    select event_name as "eventName"
    from website_event
    where website_id = {{websiteId::uuid}}
      and created_at between {{startDate}} and {{endDate}}
    group by event_name
    order by event_name asc
    `,
    params,
  );
}
