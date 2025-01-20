import { computed, defineComponent } from "vue";
import "../../less/components/table/index.less";

export default defineComponent({
    name: "SeTable",
    props: {
        rows: {
            type:  Array as () => Array<Record<string, any>>,
            required: true,
        },
        rowHeight: {
            type: Number,
            default: 50,
        },
        visibleCount: {
            type: Number,
            default: 10,
        },
        containerHeight: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        // 提取列信息
        const columns = computed(() => {
            if (props.rows.length > 0) {
                return Object.keys(props.rows[0]).map((key) => ({
                    label: key,
                    field: key,
                }));
            }
            return [];
        });

        const handleRowClick = (row: any) => {
            console.log("Row clicked:", row);
        };

        return {
            columns,
            handleRowClick,
        };

    },
    render() {
        return (
            <div class="se-table-container">
                {/* 表头 */}
                <div class="se-table-header">
                    {this.columns.map((column) => (
                        <div class="se-table-cell" key={column.field}>
                            {column.label}
                        </div>
                    ))}
                </div>

                {/* 使用虚拟滚动渲染内容 */}
                <se-virtual-scroller
                    items={this.rows.map((row, index) => ({
                        value: index,
                        label: row,
                    }))}
                    itemHeight={this.rowHeight}
                    visibleCount={this.visibleCount}
                    containerHeight={this.containerHeight}
                    isTable={true}
                >
                    {{
                        default: ({ value }: { value: number }) => (
                            <div
                                class="se-table-row"
                                style={{ height: `${this.rowHeight}px` }}
                                onClick={() => this.handleRowClick(this.rows[value])}
                            >
                                {this.columns.map((column) => (
                                    <div class="se-table-cell" key={column.field}>
                                        {this.rows[value] && this.rows[value][column.field]}
                                    </div>
                                ))}
                            </div>
                        ),
                    }}
                </se-virtual-scroller>
            </div>
        );
    },
});
