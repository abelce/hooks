import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import useFavicon from '..';

describe('Test useFavicon', () => {
  it('useFavicon', () => {
    const url = 'fav.png';
    renderHook((initialProps) => useFavicon(initialProps), {
      initialProps: url,
    });

    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveAttribute('rel', 'shortcut icon');
  });
});
