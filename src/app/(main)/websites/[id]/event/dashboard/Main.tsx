// import { useState, useEffect } from 'react';

import { useNavigation } from 'components/hooks';
import WebsiteDateFilter from 'components/input/WebsiteDateFilter';

import { useEventNames, useEventFieldNames } from '../base';

export default function WebsiteEventDashboardMain({ websiteId }: { websiteId: string }) {
  const {
    query: { event: initEvent },
  } = useNavigation();

  // const data = useState<Record<string, Record<string, >>>();
  const { data: eventNames } = useEventNames(websiteId);
  const { data: fieldNames } = useEventFieldNames(websiteId, initEvent ?? undefined);

  // if (initEvent) {
  //   return null; // TODO: redirect
  // }

  return (
    <div>
      <div>
        <WebsiteDateFilter websiteId={websiteId} />
      </div>
      <div>{JSON.stringify(eventNames, null, 4)}</div>
      <div>
        {fieldNames && Array.from(fieldNames as any).length} {JSON.stringify(fieldNames, null, 4)}
      </div>
    </div>
  );
}
