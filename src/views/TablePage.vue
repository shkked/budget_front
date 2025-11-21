<template>
  <q-page class="fit bg-light-grey page-flex">
    <!-- Блок загрузки документа -->
    <div class="hidden row items-end q-gutter-sm q-w-sm q-mt-md">
      <div class="q-mr-lg">
        <p class="q-text-h6">Выбор даты</p>
        <vue-date-picker
          v-model="dateData"
          class="custom_input"
          month-picker
          locale="ru"
          :format="`MM/yyyy`"
          :input-class-name="'picker_input'"
          :menu-class-name="'picker_menu'"
          select-text="Выбрать"
          cancel-text="Отмена"
        />
      </div>
      <div class="q-mr-lg">
        <p class="">Загрузка документа</p>
        <q-file
          v-model="fileData"
          class="custom_input bg-white"
          style="width: 270px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          bg-color="white"
          outlined
          label="Выберите файл"
          clearable
          dense
        />
      </div>
      <q-btn @click="uploadData" color="primary" class="custom_btn">
        <template v-if="isLoadingUpload">
          <q-spinner :size="20" color="white" />
        </template>
        <template v-else> Загрузить </template>
      </q-btn>
    </div>
    <div class="q-mt-md card-flex column bg-white rounded-borders">
      <q-card-section class="row items-end justify-between">
        <div class="row items-center q-gutter-sm">
          <div class="q-mr-lg">
            <p>Клиент</p>
            <q-select
              v-model="filtersData.client"
              class="custom_input bg-white"
              label="Выберите клиента"
              outlined
              bg-color="white"
              dense="dense"
              hide-bottom-space
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">Нет данных</q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="q-mr-lg">
            <p>Регион</p>
            <q-select
              v-model="filtersData.region"
              class="custom_input bg-white"
              outlined
              label="Выберите регион"
              bg-color="white"
              dense="dense"
              hide-bottom-space
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">Нет данных</q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="q-mr-lg">
            <p>Месяц</p>
            <q-select
              v-model="filtersData.month"
              :options="monthItems"
              map-options
              emit-value
              menu-anchor="bottom left"
              menu-self="top left"
              class="custom_input bg-white"
              outlined
              label="Выберите месяц"
              bg-color="white"
              dense="dense"
              hide-bottom-space
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">Нет данных</q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="q-mr-lg">
            <p>Год</p>
            <q-select
              v-model="filtersData.year"
              :options="yearItems"
              class="custom_input bg-white"
              menu-anchor="bottom left"
              msenu-self="top left"
              label="Выберите год"
              outlined
              bg-color="white"
              dense="dense"
              hide-bottom-space
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">Нет данных</q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>

        <div>
          <q-btn @click="collapseRows(rowsData)" color="primary" class="btn-collapse">
            Свернуть все
          </q-btn>
        </div>
      </q-card-section>
      <!-- Лоадер таблицы -->
      <div class="flex flex-auto column table-scroll-wrapper">
        <SkeletonTable v-if="isLoading" />
        <q-table
          v-else
          class="q-mt-md sticky-header overflow-auto"
          table-header-class="bg-white"
          style="height: calc(100vh - 250px)"
          hide-bottom
          :columns="columnsData"
          :rows="rowsData"
          table-style="table-layout: auto; width: 100%;"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th colspan="1">
                <div class="flex items-center">
                  <q-btn icon="settings" flat size="sm" style="width: 32px">
                    <q-menu
                      ref="menuCols"
                      anchor="top right"
                      self="top left"
                      style="width: 300px; height: 400px"
                    >
                      <div class="no-wrap column q-pa-md">
                        <div
                          class="q-pa-sm flex row items-center justify-between"
                          style="width: 100%"
                        >
                          <div class="text-h6">Список колонок</div>
                          <q-btn dense flat icon="close" @click="$refs.menuCols.hide()" />
                        </div>
                        <q-separator></q-separator>
                      </div>
                      <div class="q-px-md q-pb-md flex column">
                        <q-checkbox
                          v-for="col in visibleColumns"
                          :key="col.name"
                          v-model="col.visible"
                          @update:model-value="updateSettingsCols($event, col)"
                          :label="col.label"
                          class="q-mb-sm"
                        />
                      </div>
                    </q-menu>
                  </q-btn>
                </div>
              </q-th>
              <q-th colspan="1" :class="{ hidden: !isColHidden('date') }"></q-th>
              <q-th colspan="1" :class="{ hidden: !isColHidden('numberOfSerial') }"></q-th>
              <q-th colspan="1" :class="{ hidden: !isColHidden('budget') }"></q-th>
              <q-th
                v-for="col in headerCols"
                :colspan="col.colspan"
                :key="col.name"
                :style="col.style"
                class="text-center"
                :class="{ hidden: !isColHidden(col.id) }"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                :class="{ hidden: !col.visible }"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <RowRenderer
              :rowData="props.row"
              :colsData="props.cols"
              :nameRow="'serviceName'"
              :childrenRow="'departments'"
              :key="props.row.id"
              @toggle-expand="toggleRowExpand"
            />
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import RowRenderer from "@/components/RowRenderer.vue";
import SkeletonTable from "@/components/SkeletonTable.vue";
import { useTableStore } from "@/stores/table.store";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";

const tableStore = useTableStore();
const {
  rowsData,
  columnsData,
  headerCols,
  filtersData,
  monthItems,
  yearItems,
  isLoading,
  isLoadingUpload,
  dateData,
  fileData,
  visibleColumns,
} = storeToRefs(tableStore);
const {
  toggleRowExpand,
  fetchDataRows,
  uploadData,
  updateSettingsCols,
  isColHidden,
  collapseRows,
} = tableStore;

watch(
  () => filtersData.value,
  () => {
    fetchDataRows();
  },
  { deep: true }
);
onMounted(() => {
  fetchDataRows();
});
</script>

<style lang="scss">
.table-scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  flex: 1 1 0%;
  min-width: 0;
}
.q-table th,
.q-table td {
  padding: 2px 3px;
  border-right: 1px solid #e0e0e0;
}
.custom_input {
  width: 200px;
  border-radius: 4px;
}
.custom_btn {
  height: 40px;
  width: 100px;
}
.q-table {
  border: 1px solid #e0e0e0;
}
.q-table__container {
  box-shadow: none;
}
.q-table tbody tr:nth-child(even) {
  background-color: #f7f7fa;
}
.q-table tbody tr:nth-child(odd) {
  background-color: #fff;
}
.bg__budget-balance {
  background-color: #e1f0ff !important;
}
.bg__total {
  background-color: #a1ceff !important;
}
.btn-collapse {
  height: 40px;
}
</style>
