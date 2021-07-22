import { useAtom } from 'jotai';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { authentication } from '../state/authentication';

interface SecretProps {}

function Secret({}: SecretProps) {
  return <Layout title="Secret"></Layout>;
}

export default Secret;
