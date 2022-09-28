import { writable } from 'svelte/store';
import dayjs from 'dayjs';
import { AnalyticsBrowser } from '@segment/analytics-next';

export const birthday = writable(dayjs().format('MM/DD/YYYY'));
export const analytics = AnalyticsBrowser.load({ writeKey: '7CZ1AYXRO9ueh7ILAb2aKXCCIrQ1tNFz' });
export const weeksOld = writable('2000');
