import { act, renderHook } from '@testing-library/react';

import { useCurrentState } from '../index';

describe('useCurrentState', () => {
  it('should work correctly', () => {
    const { result } = renderHook(() => useCurrentState(''));

    act(() => result.current[1]('test'));
    expect(result.current[0]).toEqual('test');
    expect(result.current[2].current).toEqual('test');
  });

  it('functional initial mode should be supported', () => {
    const { result } = renderHook(() => useCurrentState(() => 1 + 1));
    expect(result.current[0]).toEqual(2);
    act(() => result.current[1](0));
    expect(result.current[0]).toEqual(0);
    expect(result.current[2].current).toEqual(0);
  });

  it('functional update mode should be supported', () => {
    const { result } = renderHook(() => useCurrentState(0));
    expect(result.current[0]).toEqual(0);

    act(() => result.current[1]((pre) => pre + 10));
    expect(result.current[0]).toEqual(10);
    expect(result.current[2].current).toEqual(10);
  });
});
