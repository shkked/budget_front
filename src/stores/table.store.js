import { api } from "@/axios";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useTableStore = defineStore("table", () => {
  const isLoading = ref(true);
  const isLoadingUpload = ref(false);

  const dateData = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const fileData = ref(null);

  const rowsData = ref([]);

  // Фильтры
  const filtersData = reactive({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    client: null,
    region: null,
  });
  const monthItems = ref([
    { label: "Январь", value: 1 },
    { label: "Февраль", value: 2 },
    { label: "Март", value: 3 },
    { label: "Апрель", value: 4 },
    { label: "Май", value: 5 },
    { label: "Июнь", value: 6 },
    { label: "Июль", value: 7 },
    { label: "Август", value: 8 },
    { label: "Сентябрь", value: 9 },
    { label: "Октябрь", value: 10 },
    { label: "Ноябрь", value: 11 },
    { label: "Декабрь", value: 12 },
  ]);
  const yearItems = ref([2025, 2024, 2023, 2022, 2021, 2020]);

  // Колонки таблицы
  const columnsData = ref([
    {
      name: "name",
      required: true,
      label: "",
      align: "center",
      field: "name",
      style: "min-width: 265px;",
      headerStyle: "min-width: 265px;",
      visible: true,
    },
    {
      id: "date",
      name: "date",
      required: true,
      label: "Дата",
      align: "center",
      field: "date",
      style: "min-width: 100px;",
      headerStyle: "min-width: 100px;",
      visible: true,
    },
    {
      id: "numberOfSerial",
      name: "numberOfSerial",
      required: true,
      label: "Активов",
      align: "center",
      field: "numberOfSerial",
      visible: true,
    },
    {
      id: "budget",
      name: "budget",
      required: true,
      label: "Бюджет",
      align: "center",
      field: "budget",
      visible: true,
    },
    {
      id: "balance_budget",
      name: "balanceOfCurrentDate",
      required: true,
      label: "Остаток на текущую дату",
      align: "center",
      field: "balanceOfCurrentDate",
      visible: true,
      style: "max-width: 180px; min-width: 120px; background-color: #A1CEFF;",
      headerStyle:
        "max-width: 180px; white-space: normal !important; min-width: 120px; background-color: #A1CEFF;",
    },
    {
      id: "balance_budget",
      name: "balanceIncludingNewTasks",
      required: true,
      label: "Остаток с учетом новых заявок",
      align: "center",
      field: "balanceIncludingNewTasks",
      visible: true,
      style: "min-width: 150px; background-color: #E1F0FF;",
      headerStyle: "min-width: 150px; white-space: normal !important;  background-color: #E1F0FF",
    },
    {
      id: "total",
      name: "amountOfExpenses",
      required: true,
      label: "Сумма трат на текущую дату",
      align: "center",
      field: "amountOfExpenses",
      visible: true,
      style: "min-width: 150px; background-color: #E1F0FF;",
      headerStyle: "min-width: 150px; white-space: normal !important; background-color: #E1F0FF;",
    },
    {
      id: "purchase_24_7",
      name: "amountByAgreement",
      required: true,
      label: "На согласовании",
      align: "center",
      field: "amountByAgreement",
      visible: true,
      style: "min-width: 80px;",
      headerStyle: "min-width: 80px; white-space: normal !important",
    },
    {
      id: "purchase_24_7",
      name: "agreedAmount",
      required: true,
      label: "Согласовано",
      align: "center",
      field: "agreedAmount",
      visible: true,
    },
    {
      id: "purchase_min",
      name: "purchase_min_under_approval",
      required: true,
      label: "На согласовании",
      align: "center",
      field: "minZaByAgreement",
      visible: true,
      style: "min-width: 80px;",
      headerStyle: "min-width: 80px; white-space: normal !important",
    },
    {
      id: "purchase_min",
      name: "purchase_min_agreed",
      required: true,
      label: "Согласовано",
      align: "center",
      field: "agreedMinZa",
      visible: true,
    },
    {
      id: "purchase_card",
      name: "sc",
      required: true,
      label: "",
      align: "center",
      field: "sc",
      visible: true,
    },
    {
      id: "sp_incid",
      name: "sp_incid",
      required: true,
      label: "",
      align: "center",
      field: "sp_incid",
      visible: true,
    },
  ]);
  // Верхние заголовки в таблице
  const headerCols = computed(() => [
    {
      id: "balance_budget",
      name: "balance_budget",
      required: true,
      label: "Остаток бюджета",
      colspan: columnsData.value
        .filter((c) => c.id === "balance_budget")
        .some((item) => !item.visible)
        ? 1
        : 2,
      align: "center",
      style: "background-color: #E1F0FF;",
    },
    {
      id: "total",
      name: "total",
      required: true,
      label: "Итого",
      colspan: 1,
      align: "center",
      style: "background-color: #E1F0FF;",
    },
    {
      id: "purchase_24_7",
      name: "purchase_total",
      required: true,
      label: "Закупка 24/7",
      colspan: 2,
      align: "center",
    },
    {
      id: "purchase_min",
      name: "purchase_min",
      required: true,
      label: "Закупка Мин.Запаса",
      colspan: 2,
      align: "center",
    },
    {
      id: "purchase_card",
      name: "sc",
      required: true,
      label: "Закупки СЦ Карта",
      colspan: 1,
      align: "center",
    },
    {
      id: "sp_incid",
      name: "sp_incid",
      required: true,
      label: "СП - инцидент",
      colspan: 1,
      align: "center",
    },
  ]);
  const visibleColumns = computed(() => {
    // Пропускаем первый столбец (name)
    const columns = columnsData.value.slice(1);
    // console.log(columns);
    // Заменяем группы колонок на итоговые
    return [
      ...columns.slice(0, 6),
      { label: "Закупка 24/7", visible: true, id: "purchase_24_7" },
      { label: "Закупка Мин. запаса", visible: true, id: "purchase_min" },
      { label: "Закупки СЦ Карта", visible: true, id: "purchase_card" },
      { label: "СП - инцидент", visible: true, id: "sp_incid" },
    ];
  });
  // Функция для переключения состояния раскрытия строки
  const toggleRowExpand = (row) => {
    row.isExpanded = !row.isExpanded;
  };
  // Добавление свойства isExpanded ко всем объектам
  const addIsExpanded = (obj) => {
    if (obj && typeof obj === "object") {
      let hasNested = false;
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          hasNested = true;
          obj[key].forEach(addIsExpanded);
        } else if (obj[key] && typeof obj[key] === "object") {
          hasNested = true;
          addIsExpanded(obj[key]);
        }
      }
      if (hasNested) {
        obj.isExpanded = false;
      }
    }
  };
  function collapseRows(items) {
    if (!Array.isArray(items)) return;

    items.forEach((item) => {
      if ("isExpanded" in item && !item?.serviceName) {
        item.isExpanded = false;
      }

      Object.values(item).forEach((value) => {
        if (Array.isArray(value)) {
          collapseRows(value);
        }
      });
    });
  }
  // Обновление значения массива со строками
  const updateDataRows = (rows) => {
    rows.forEach(addIsExpanded);
    rowsData.value = rows;
  };
  // Изменение видимости колонок в настройках
  const updateSettingsCols = (event, col) => {
    if (col.id === "balance_budget") {
      columnsData.value
        .filter((column) => column.name === col.name)
        .forEach((column) => (column.visible = event));
    } else {
      columnsData.value.filter((c) => c.id === col.id).forEach((item) => (item.visible = event));
    }
  };
  // Проверка видимости колонки
  const isColHidden = (colId) =>
    colId === "balance_budget"
      ? columnsData.value.filter((c) => c.id === colId).some((c) => c.visible)
      : columnsData.value.find((c) => c.id === colId)?.visible;

  // Загрузка данных для таблицы
  const fetchDataRows = async () => {
    try {
      isLoading.value = true;

      const params = {
        month: filtersData.month,
        year: filtersData.year,
      };
      const response = await api.get("/budget", { params });
      updateDataRows(response.data);
      // console.log(rowsData.value);

      isLoading.value = false;
    } catch (e) {
      console.error(e);
    }
  };
  // Отправка данных на сервер
  const uploadData = async () => {
    try {
      isLoadingUpload.value = true;
      const formData = new FormData();
      formData.append("file", fileData.value);
      formData.append("month", dateData.value.month + 1);
      formData.append("year", dateData.value.year);

      // console.log(formData)
      const response = await api.post("/billings/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response?.data);
      console.log("Успешно загружено");
    } catch (e) {
      console.error(e);
    } finally {
      isLoadingUpload.value = false;
    }
  };
  return {
    visibleColumns,
    rowsData,
    updateDataRows,
    updateSettingsCols,
    fetchDataRows,
    columnsData,
    headerCols,
    filtersData,
    monthItems,
    yearItems,
    toggleRowExpand,
    isLoading,
    uploadData,
    dateData,
    fileData,
    isLoadingUpload,
    isColHidden,
    collapseRows,
  };
});
