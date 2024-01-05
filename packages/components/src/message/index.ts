import _Message from './src/method.ts';
import { withInstallFunction } from '@selab-ui/utils/index.ts';

export const seMsg = withInstallFunction(_Message, '$seMsg');

export default seMsg;
