import {Icon} from "./components/src";
import {Tag} from "./components/src";
import {Skeleton} from "./components/src";
import {Select} from "./components/src";
import {Card} from "./components/src";
import {Button} from "./components/src";
import {Box} from "./components/src";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        seButton: typeof Button;
        seBox: typeof Box;
        //[
		 seIcon: typeof Icon;
        seTag: typeof Tag;
        seSkeleton: typeof Skeleton;
        seSelect: typeof Select;
        seCard: typeof Card;
    }
}


//]