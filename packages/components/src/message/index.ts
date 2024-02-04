import _Message from './src/method.ts';
import { withInstallFunction } from '@selab-ui/utils/index.ts';

export const Msg = withInstallFunction(_Message, '$SeMsg');

export default Msg;
