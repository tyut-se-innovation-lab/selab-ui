import { defineComponent, ref, computed, PropType, watch, onUnmounted, onMounted } from 'vue';
import '../../less/components/datePicker/index.less';

export default defineComponent({
  name: 'SeDatePicker',
  props: {
    modelValue: {
      type: [String, Date] as PropType<string | Date>,
      default: '',
    },
    type: {
      type: String as PropType<'date' | 'month' | 'year' | 'time'>,
      default: 'date',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const date = ref(props.modelValue ? new Date(props.modelValue) : new Date());
    const time = ref({
      hours: date.value.getHours(),
      minutes: date.value.getMinutes(),
      seconds: date.value.getSeconds(),
    });
    const isDropdownVisible = ref(false);
    const datePickerRef = ref<HTMLElement | null>(null);  // 引用添加在此

    // 监听外部的 modelValue 变化
    watch(() => props.modelValue, (newValue) => {
      date.value = newValue ? new Date(newValue) : new Date();
      time.value = {
        hours: date.value.getHours(),
        minutes: date.value.getMinutes(),
        seconds: date.value.getSeconds(),
      };
    });

    // 格式化显示的日期
    const formattedDate = computed(() => {
      if (props.type === 'time') {
        return `${time.value.hours.toString().padStart(2, '0')}:${time.value.minutes.toString().padStart(2, '0')}:${time.value.seconds.toString().padStart(2, '0')}`;
      } else if (props.type === 'month') {
        return `${date.value.getFullYear()}-${(date.value.getMonth() + 1).toString().padStart(2, '0')}`;
      } else if (props.type === 'year') {
        return `${date.value.getFullYear()}`;
      } else {
        return `${date.value.getFullYear()}-${(date.value.getMonth() + 1).toString().padStart(2, '0')}-${date.value.getDate().toString().padStart(2, '0')}`;
      }
    });

    // 处理日期的改变
    const handleChange = () => {
      const updatedDate = new Date(date.value);
      updatedDate.setHours(time.value.hours);
      updatedDate.setMinutes(time.value.minutes);
      updatedDate.setSeconds(time.value.seconds);
      emit('update:modelValue', updatedDate);
      emit('change', updatedDate);
    };

    // 显示或隐藏日期选择框
    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    // 处理日期选择
    const handleDateSelect = (newDate: Date) => {
      date.value = newDate;
      handleChange();
      isDropdownVisible.value = false;
    };

    // 清空日期
    const clearDate = () => {
      date.value = new Date();
      time.value = { hours: 0, minutes: 0, seconds: 0 };
      emit('update:modelValue', '');
      emit('change', '');
    };

    // 点击外部关闭下拉框
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.value && !datePickerRef.value.contains(event.target as Node)) {
        isDropdownVisible.value = false;
      }
    };

    // 挂载和销毁事件监听
    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    // 渲染日历
    const renderCalendar = () => {
      const daysInMonth = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate();
      const firstDayOfMonth = new Date(date.value.getFullYear(), date.value.getMonth(), 1).getDay();
      const days = [];

      // 上一年
      const prevYear = () => {
        date.value.setFullYear(date.value.getFullYear() - 1);
        handleChange();  // 确保更新值
      };

      // 上一个月
      const prevMonth = () => {
        date.value.setMonth(date.value.getMonth() - 1);
        handleChange();  // 确保更新值
      };

      // 下一年
      const nextYear = () => {
        date.value.setFullYear(date.value.getFullYear() + 1);
        handleChange();  // 确保更新值
      };

      // 下一个月
      const nextMonth = () => {
        date.value.setMonth(date.value.getMonth() + 1);
        handleChange();  // 确保更新值
      };

      // 生成上一个月、下一个月、上一年、下一年按钮
      const renderNav = () => {
        return (
            <div class="calendar-nav">
              <a class="nav-btn" onClick={prevYear}>上一年</a>
              <a class="nav-btn" onClick={prevMonth}>上一月</a>
              <span class="current-month">
              {date.value.getFullYear()}年 {date.value.getMonth() + 1}月
            </span>
              <a class="nav-btn" onClick={nextMonth}>下一月</a>
              <a class="nav-btn" onClick={nextYear}>下一年</a>
            </div>
        );
      };

      // 填充前面的空白
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<span class="empty"></span>);
      }

      // 添加日期
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(
            <span
                class="day"
                onClick={() => handleDateSelect(new Date(date.value.getFullYear(), date.value.getMonth(), i))}
            >
            {i}
          </span>
        );
      }

      return (
          <div class="calendar">
            {renderNav()} {/* 渲染月份和年份导航按钮 */}
            <div class="days">{days}</div>
          </div>
      );
    };

    // 渲染时间选择器
    const renderTimePicker = () => {
      const hours = [];
      const minutes = [];
      const seconds = [];
      for (let i = 0; i < 24; i++) {
        hours.push(i.toString().padStart(2, '0'));
      }
      for (let i = 0; i < 60; i++) {
        minutes.push(i.toString().padStart(2, '0'));
        seconds.push(i.toString().padStart(2, '0'));
      }

      return (
          <div class="time">
            <select value={time.value.hours} onChange={(e) => { time.value.hours = Number(e.target.value); handleChange(); }}>
              {hours.map((h) => <option value={h}>{h}</option>)}
            </select>
            <span>:</span>
            <select value={time.value.minutes} onChange={(e) => { time.value.minutes = Number(e.target.value); handleChange(); }}>
              {minutes.map((m) => <option value={m}>{m}</option>)}
            </select>
            <span>:</span>
            <select value={time.value.seconds} onChange={(e) => { time.value.seconds = Number(e.target.value); handleChange(); }}>
              {seconds.map((s) => <option value={s}>{s}</option>)}
            </select>
          </div>
      );
    };

    // 渲染月份选择器
    const renderMonthPicker = () => {
      const months = [];
      for (let i = 1; i <= 12; i++) {
        months.push(
            <span
                class="month"
                onClick={() => handleDateSelect(new Date(date.value.getFullYear(), i - 1, 1))}
            >
            {i.toString().padStart(2, '0')}
          </span>
        );
      }
      return <div class="months">{months}</div>;
    };

    // 渲染年份选择器
    const renderYearPicker = () => {
      const startYear = 1900;
      const endYear = 2100;
      const yearsPerPage = 20;  // 每页显示20年
      const currentStartYear = Math.floor(date.value.getFullYear() / yearsPerPage) * yearsPerPage;  // 当前页的起始年份

      // 生成当前页年份
      const years = [];
      for (let i = currentStartYear; i < currentStartYear + yearsPerPage && i <= endYear; i++) {
        years.push(
            <span
                class="year"
                onClick={() => handleDateSelect(new Date(i, date.value.getMonth(), 1))}
            >
            {i}
          </span>
        );
      }

      // 上一页
      const prevPage = () => {
        date.value.setFullYear(currentStartYear - yearsPerPage);
        handleChange();  // 确保更新值
      };

      // 下一页
      const nextPage = () => {
        date.value.setFullYear(currentStartYear + yearsPerPage);
        handleChange();  // 确保更新值
      };

      return (
          <div class="years">
            <div class="pagination">
              <div>
                <a class="nav-btn" onClick={prevPage}>上一页</a>
                <a class="nav-btn" onClick={nextPage}>下一页</a>
              </div>

              <div class="year-list">{years}</div>
            </div>
          </div>
      );
    };

    return {
      date,
      time,
      formattedDate,
      toggleDropdown,
      isDropdownVisible,
      renderCalendar,
      renderTimePicker,
      renderMonthPicker,
      renderYearPicker,
      clearDate,
      datePickerRef  // 确保返回引用
    };
  },
  render() {
    return (
        <div class="se-datePicker" ref="datePickerRef">
          <div class="input-wrapper">
            <input
                type="text"
                readonly
                value={this.formattedDate}
                onClick={this.toggleDropdown}
            />
            <button class="clear-btn" onClick={this.clearDate}>×</button>
          </div>
          {this.isDropdownVisible && (
              <div class="dropdown">
                {this.type === 'date' && this.renderCalendar()}
                {this.type === 'time' && (
                    <>
                      {this.renderCalendar()}
                      {this.renderTimePicker()}
                    </>
                )}
                {this.type === 'month' && this.renderMonthPicker()}
                {this.type === 'year' && this.renderYearPicker()}
              </div>
          )}
        </div>
    );
  },
});
