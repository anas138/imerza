import { useRouter } from 'next/router';

function getPage() {
  let path = useRouter().pathname;
  let primary = '';
  let secondary = '';
  primary = path.split('/')[1];
  secondary = path.split('/')[2];
  return [primary, secondary];
}

export default getPage;
