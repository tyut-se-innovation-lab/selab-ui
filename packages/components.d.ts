<<<<<<< HEAD
import {
    Button,
    Box,
    Card,
    Tag,
    Skeleton,
    Select
} from './components/src/index';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        SeButton: typeof Button;
        SeBox: typeof Box;
        SeCard: typeof Card;
        SeTag: typeof Tag;
        SeSkeleton: typeof Skeleton;
        SeSelect: typeof Select;
    }
}
export {};
=======
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
        seTag: typeof Tag;
        seSkeleton: typeof Skeleton;
        seSelect: typeof Select;
        seCard: typeof Card;

    }
}


//]
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
