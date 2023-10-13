import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useSearchParams from '..';

describe('Test useSearchParams', () => {
  it('should change the location search', () => {
    const { result } = renderHook(() => useSearchParams());
    act(() => {
      result.current[1]('name=jack');
    });
    expect(result.current[0].get('name')).toBe('jack');

    act(() => {
      result.current[1]((searchParams) => {
        searchParams.set('age', '23');
        return searchParams;
      });
    });
    expect(result.current[0].get('name')).toBe('jack');
    expect(result.current[0].get('age')).toBe('23');
  });
});
