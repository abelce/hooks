import isBrowser from '@/utils/isBrowser';
import { useEffect, useLayoutEffect } from 'react';

export default isBrowser() ? useLayoutEffect : useEffect;
