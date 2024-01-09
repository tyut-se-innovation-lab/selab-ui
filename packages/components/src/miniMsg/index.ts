import _MiniMsg from './src/index.tsx';
import { withInstallFunction } from '@selab-ui/utils/index.ts';

export const seMiniMsg = withInstallFunction(_MiniMsg, '$seMiniMsg');

export default seMiniMsg;
