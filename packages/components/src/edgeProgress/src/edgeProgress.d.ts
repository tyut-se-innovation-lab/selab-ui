import { UnitNumber } from '@selab-ui/utils/type';

type EdgeProgressArgString = `#${ number } ${number | UnitNumber} ${'top' | 'bottom'}`;

export type EdgeProgressArgObj = {
    color: string;
    height: UnitNumber;
    position: 'top' | 'bottom';
};

export type EdgeProgressArg = Partial<EdgeProgressArgObj & { height: number | UnitNumber }> | EdgeProgressArgString;


