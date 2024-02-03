import {Slider} from "./components/src";
import {Radio} from "./components/src";
import {Rate} from "./components/src";
import {Dialog} from "./components/src";
import {Contextmenu} from "./components/src";
import {Tooltip} from "./components/src";
import {MiniMsg} from "./components/src";
import {Img} from "./components/src";
import {Switch} from "./components/src";
import {Icon} from "./components/src";
import {Tag} from "./components/src";
import {Skeleton} from "./components/src";
import {Select} from "./components/src";
import {Card} from "./components/src";
import {Button} from "./components/src";
import {Box} from "./components/src";
import {Msg} from "./components/src";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        seButton: typeof Button;
        seBox: typeof Box;
        //[		 seSlider: typeof Slider;

		 seRadio: typeof Radio;

		 seRate: typeof Rate;
		 seDialog: typeof Dialog;
		 seContextmenu: typeof Contextmenu;
		 seTooltip: typeof Tooltip;


		 SeMiniMsg: typeof MiniMsg;

 seImg: typeof Img;        seTag: typeof Tag;
        seSkeleton: typeof Skeleton;
        seSelect: typeof Select;
        seCard: typeof Card;
        SeMsg: typeof Msg;
        //[
		 seSwitch: typeof Switch;

		 seIcon: typeof Icon;
        seTag: typeof Tag;
        seSkeleton: typeof Skeleton;
        seSelect: typeof Select;
        seCard: typeof Card;
    }

    // 声明全局变量属性
    export interface ComponentCustomProperties {
        $SeMsg: typeof Msg;
        $SeMiniMsg: typeof MiniMsg;
    }
}


//]
