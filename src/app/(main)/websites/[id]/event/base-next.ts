// TODO: 后续支持 oem 之后才会用到的代码

/** 只包含部分字段 */
export interface EventData {
  eventName: string | null;
  fieldName: string;
  dataType: number;
}

/** 排除单纯为了给用户看而创造出来的、系统不存在的特殊事件 */
export function isStdEvent({ fieldName, dataType }: EventData): boolean {
  return !!(fieldName && fieldName !== '*' && dataType);
}

/**
 * 阉割敏感数据，给非 sufy 使用
 * TODO: 接口层面拦截（而不是前端过滤）目前这么搞只是为了快速实现
 */
export function getBaseEvents(events: EventData[]): EventData[] {
  return events
    .filter(({ eventName, fieldName }) => {
      // PV views 没必要重复展示
      if (!eventName) {
        return false;
      }

      // 折叠业务公共字段
      if (fieldName.startsWith('c-')) {
        // 该字段总是存在，因此可用于间接代替相应 eventName 的触发数量
        // 接口并不会返回 eventName 本身的数量，而只返回各自定义 fieldName 的数据，因此这里相当于是扩展了原功能
        // TODO: 目前这么处理，相当于是隐藏了所有公共字段，后续可酌情放开一部分
        return fieldName === 'c-server-time';
      }

      return true; // 其他业务自定义字段
    })
    .map(data =>
      data.fieldName.startsWith('c-')
        ? {
            ...data,
            // 因为上面 c- 开头被折叠为代表 PV 了，因此不对应任何特定 fieldName 或 dataType
            fieldName: '*',
            dataType: 0,
          }
        : data,
    );
}
