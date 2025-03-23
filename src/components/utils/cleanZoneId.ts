export const cleanZoneId = (zoneId: string) => (zoneId.split('zone-').length > 1 ? zoneId.split('zone-')[1] : zoneId);
