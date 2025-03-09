import { useQuery } from '@tanstack/react-query';
import { Palette } from './Palette';

export const IndexPage = () => {
  const { data } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const response = await fetch('https://vaambival-want-back-1c8f.twc1.net/hello');
      const result = await response.text();

      return result;
    },
  });

  return (
    <>
      <div>Hello</div>
      <p>api data: {data}</p>
      <br />
      <Palette />
    </>
  );
};
