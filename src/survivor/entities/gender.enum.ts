export const Gender = {
  M: 'M',
  F: 'F',
  Other: 'Other',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
