export const makeId = (): string => crypto.randomUUID?.() || (Math.random() * 100).toString();
