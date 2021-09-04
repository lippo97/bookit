import { ky } from '@/config';

export const logout = () => ky.post('logout');
