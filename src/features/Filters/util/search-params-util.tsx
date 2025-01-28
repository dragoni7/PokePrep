import { SetURLSearchParams } from 'react-router-dom';

export function updateSearchParams(
  key: string,
  value: any,
  useSearchParams: [URLSearchParams, SetURLSearchParams]
) {
  useSearchParams[1](() => {
    if (value) {
      useSearchParams[0].set(key, value);
    } else {
      useSearchParams[0].delete(key);
    }

    return useSearchParams[0];
  });
}
