import {Col} from "./components/src";
import {Button} from "./components/src";
import {Box} from "./components/src";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        seButton: typeof Button;
        seBox: typeof Box;
        //[

    seCol: typeof Col;

    }
}


//]