import {VirtualScroller} from "./components/src";
import {Input} from "./components/src";
import {Table} from "./components/src";
import { EdgeProgress } from "./components/src";
import { Checkbox } from "./components/src";
import { Radio } from "./components/src";
import { Slider } from "./components/src";
import { Rate } from "./components/src";
import { Dialog } from "./components/src";
import { Contextmenu } from "./components/src";
import { Tooltip } from "./components/src";
import { MiniMsg } from "./components/src";
import { Img } from "./components/src";
import { Switch } from "./components/src";
import { Icon } from "./components/src";
import { Tag } from "./components/src";
import { Skeleton } from "./components/src";
import { Select } from "./components/src";
import { Card } from "./components/src";
import { Button } from "./components/src";
import { Box } from "./components/src";
import { Msg } from "./components/src";
import "@vue/runtime-core";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        seButton: typeof Button;
        seBox: typeof Box;
        seCheckbox: typeof Checkbox;
        seRadio: typeof Radio;
        //[		 seVirtualScroller: typeof VirtualScroller;

		 seInput: typeof Input;
		 seTable: typeof Table;

        seSlider: typeof Slider;
        seRate: typeof Rate;
        seDialog: typeof Dialog;
        seTooltip: typeof Tooltip;
        seImg: typeof Img;
        seTag: typeof Tag;
        seSkeleton: typeof Skeleton;
        seSelect: typeof Select;
        seCard: typeof Card;
        //[
        seSwitch: typeof Switch;
        seIcon: typeof Icon;
        seTag: typeof Tag;
        seSkeleton: typeof Skeleton;
        seSelect: typeof Select;
        seCard: typeof Card;
    }
}

// import { ContextmenuType } from './components/src/contextmenu/src/contextmenu.d';

declare module "vue" {
    export interface ComponentCustomProperties {
        $seMsg: typeof Msg;
        $seMiniMsg: typeof MiniMsg;
    }

    // export interface ComponentCustomProps {
    //     'v-contextmenu'?: ContextmenuType;
    //     'v-edge-progress'?: EdgeProgressArg;
    // }
}


//]



export {};
