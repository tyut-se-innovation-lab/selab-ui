import { defineComponent, ref, computed, PropType, watch,  } from "vue";
import "../../less/components/pagination/index.less";

export default defineComponent({
  name: "se-pagination",
  props: {
    total: {
      type: Number as PropType<number>,
      required: true,
    },
    currentPage: {
      type: Number as PropType<number>,
      default: 1,
    },
    pageSize: {
      type: Number as PropType<number>,
      default: 10,
    },
    pageSizeOptions: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 50, 100],
    },
  },
  emits: ["update:currentPage", "update:pageSize"],
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);
    const pageSize = ref(props.pageSize);

    const totalPages = computed(() => {
      return Math.ceil(props.total / pageSize.value);
    });

    // 计算分页按钮数组，包括省略号
    const pageItems = computed(() => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (currentPage.value > 3) {
          pages.push("...");
        }

        const start = Math.max(2, currentPage.value - 2);
        const end = Math.min(totalPages.value - 1, currentPage.value + 2);
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (currentPage.value < totalPages.value - 2) {
          pages.push("...");
        }

        pages.push(totalPages.value);
      }

      return pages.filter((item, index, arr) => {
        if (item === "..." && arr[index - 1] === "...") {
          return false;
        }
        return true;
      });
    });

    // 页码改变时触发
    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        emit("update:currentPage", page);  // 触发自定义事件，更新当前页
      }
    };

    // 改变每页显示条目数
    const handlePageSizeChange = (size: number) => {
      pageSize.value = size;
      emit("update:pageSize", size);  // 触发自定义事件，更新每页显示条目数
    };

    // 点击上一页
    const handlePrevPage = () => {
      if (currentPage.value > 1) {
        handlePageChange(currentPage.value - 1);
      }
    };

    // 点击下一页
    const handleNextPage = () => {
      if (currentPage.value < totalPages.value) {
        handlePageChange(currentPage.value + 1);
      }
    };

    return () => (
        <div class="se-pagination">
          <div class="se-pagination-controls">
            {/* 上一页按钮 */}
            <a
                href="javascript:void(0);"
                class="se-pagination-prev"
                onClick={handlePrevPage}
                disabled={currentPage.value <= 1}
            >
              上一页
            </a>

            {/* 显示分页数字 */}
            <div class="se-pagination-numbers">
              {pageItems.value.map((item) => {
                if (item === "...") {
                  return (
                      <span key={item} class="se-pagination-ellipsis">
                    {item}
                  </span>
                  );
                } else {
                  return (
                      <a
                          key={item}
                          href="javascript:void(0);"
                          class={{
                            "se-pagination-more-item": true,
                            active: currentPage.value === item,
                          }}
                          onClick={() => handlePageChange(item as number)}
                      >
                        {item}
                      </a>
                  );
                }
              })}
            </div>

            {/* 下一页按钮 */}
            <a
                href="javascript:void(0);"
                class="se-pagination-next"
                onClick={handleNextPage}
                disabled={currentPage.value >= totalPages.value}
            >
              下一页
            </a>
          </div>

          {/* 每页显示条目数选择和跳至输入框并列显示 */}
          <div class="se-pagination-options">
            <div class="se-pagination-page-size">
              <span>每页显示</span>
              <select
                  value={pageSize.value}
                  onChange={(e: Event) => handlePageSizeChange(Number((e.target as HTMLSelectElement).value))}
              >
                {props.pageSizeOptions.map((size) => (
                    <option value={size} key={size}>
                      {size} 条
                    </option>
                ))}
              </select>
              <span>条</span>
            </div>

            <div class="se-pagination-jump">
              <span>跳至</span>
              <input
                  type="number"
                  value={currentPage.value}
                  min={1}
                  max={totalPages.value}
                  onInput={(e: Event) => handlePageChange(Number((e.target as HTMLInputElement).value))}
              />
              <span>页</span>
            </div>
          </div>
        </div>
    );
  },
});
