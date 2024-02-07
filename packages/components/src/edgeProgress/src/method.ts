import { UnitNumber } from '@selab-ui/utils/type';
import { getUnitHeight } from '@selab-ui/utils';
import { EdgeProgressArg, EdgeProgressArgObj } from './edgeProgress';

const padHex = (hexString: string): string => {
    switch (hexString.length) {
        case 3:
            return (
                hexString[0] +
                hexString[0] +
                hexString[1] +
                hexString[1] +
                hexString[2] +
                hexString[2]
            );
        case 0:
        case 1:
        case 2:
        case 4:
        case 5:
            return padHex('0' + hexString);
        case 6:
            return hexString;
        case 7:
            return padHex(hexString + '0');
        case 8:
            return hexString;
        default:
            throw console.error('Edge Progress > Invalid color');
    }
};

const _hexSet = new Set([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
]);

/** arg 配置检查 */
function argCheck(arg: EdgeProgressArg | undefined): EdgeProgressArgObj {
    if (typeof arg === 'undefined') {
        return { color: '#0066ff', height: '5px', position: 'top' };
    } else if (typeof arg === 'string') {
        const [_color, _height, _position] = arg.split(' ');
        const color =
            '#' +
            padHex((() => _color || '#0066ff')().replace('#', ''))
                .split('')
                .map((v) => {
                    if (_hexSet.has(v)) return v;
                    else throw console.error('Edge Progress > Invalid color');
                })
                .join('');
        const height = (() => {
            if (_height) {
                if (_height.length === parseInt(_height).toString().length) {
                    return (_height + 'px') as UnitNumber;
                } else return isNaN(parseInt(_height)) ? '5px' : _height;
            } else return '5px';
        })() as UnitNumber;
        const position = (() => {
            if (_position) {
                if (_position === 'top' || _position === 'bottom') {
                    return _position;
                } else return 'top';
            } else return 'top';
        })() as 'top' | 'bottom';
        return {
            color,
            height,
            position
        };
    } else {
        return {
            color:
                '#' +
                padHex((() => arg.color || '#0066ff')().replace('#', ''))
                    .split('')
                    .map((v) => {
                        if (_hexSet.has(v)) return v;
                        else
                            throw console.error(
                                'Edge Progress > Invalid color'
                            );
                    })
                    .join(''),
            height: (() => {
                if (typeof arg.height === 'string') {
                    if (
                        arg.height.length ===
                        parseInt(arg.height).toString().length
                    ) {
                        return (arg.height + 'px') as UnitNumber;
                    } else return arg.height;
                } else if (typeof arg.height === 'number') {
                    return (arg.height + 'px') as UnitNumber;
                } else return '5px';
            })() as UnitNumber,
            position: (() => {
                if (arg.position) {
                    if (arg.position === 'top' || arg.position === 'bottom') {
                        return arg.position;
                    } else return 'top';
                } else return 'top';
            })() as 'top' | 'bottom'
        };
    }
}

/** value 配置检查 */
function valueCheck(value: number, height: UnitNumber): string {
    return value >= 100
        ? `calc(100% + ${getUnitHeight(height) / 2}px)`
        : value < 0
          ? '0%'
          : `${value}%`;
}

export { argCheck, valueCheck };
