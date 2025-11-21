<template>
  <q-tr>
    <q-td
      v-for="col in colsData"
      :key="col.name"
      :class="{
        hidden: !col.visible,
        'text-bold': levelChildren === 0 || levelChildren === 1,
        bg__total: col.field === 'balanceOfCurrentDate',
        'bg__budget-balance':
          col.field === 'balanceIncludingNewTasks' || col.field === 'amountOfExpenses',
        'text-bold text-italic': levelChildren === 2 && rowData.isExpanded,
      }"
    >
      <div
        v-if="col.field === 'name'"
        class="flex row items-center"
        :class="{
          'q-ml-md': levelChildren && levelChildren == 2,
          'q-ml-sm': levelChildren && levelChildren == 1,
        }"
      >
        <q-btn
          v-if="levelChildren !== 3"
          :icon="rowData.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          flat
          size="sm"
          class="q-mr-sm"
          style="width: 32px"
          :class="{
            invisible: !rowData[childrenRow].length,
          }"
          @click="$emit('toggle-expand', rowData)"
        />
        {{ rowData[nameRow] }}
      </div>
      <div v-else class="text-right q-mx-xs">
        {{
          col.field === "date" ? rowData[col.field] : formatNumbers(rowData[col.field], col.field)
        }}
      </div>
    </q-td>
  </q-tr>

  <!-- Отрисовка вложенных строк -->
  <template v-if="rowData.isExpanded">
    <!-- Отрисовка вложенных строк на уровне 0 -->
    <template v-if="levelChildren === 0">
      <RowRenderer
        v-for="child in rowData.departments"
        :key="child.id"
        :childrenRow="'engineers'"
        :nameRow="'departmentName'"
        :rowData="child"
        :colsData="colsData"
        :levelChildren="levelChildren + 1"
        @toggle-expand="$emit('toggle-expand', $event)"
      />
    </template>
    <!-- Отрисовка вложенных строк на уровне 1 -->
    <template v-else-if="levelChildren === 1">
      <RowRenderer
        v-for="child in rowData.engineers"
        :key="child.id"
        :childrenRow="'details'"
        :rowData="child"
        :nameRow="'name'"
        :colsData="colsData"
        :levelChildren="levelChildren + 1"
        @toggle-expand="$emit('toggle-expand', $event)"
      />
    </template>
    <!-- Отрисовка вложенных строк на уровне 2 -->
    <template v-else-if="levelChildren === 2">
      <RowRenderer
        v-for="child in rowData.details"
        :key="child.id"
        :rowData="child"
        :colsData="colsData"
        :levelChildren="levelChildren + 1"
        @toggle-expand="$emit('toggle-expand', $event)"
      />
    </template>
  </template>
</template>

<script setup>
import { formatNumbers } from "@/composables";
defineProps({
  rowData: {
    type: Object,
    required: true,
  },
  colsData: {
    type: Array,
    required: true,
  },
  levelChildren: {
    type: Number,
    default: 0,
  },
  nameRow: {
    type: String,
    default: "",
  },
  childrenRow: {
    type: String,
    default: "",
  },
});

defineEmits(["toggle-expand"]);
</script>
