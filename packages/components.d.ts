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
