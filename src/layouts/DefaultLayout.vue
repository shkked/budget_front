<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-3">
    <q-header elevated class="custom_header flex items-center bg-primary text-white">
      <q-toolbar>
        <q-space></q-space>
        <q-toolbar-title class="absolute-center text-uppercase text-center text-weight-bold">
          Бюджет
        </q-toolbar-title>
        <q-space></q-space>
        <div class="flex row q-px-sm">
          <q-btn
            :label="'Иванов Иван Иванович'"
            flat
            icon-right="account_circle"
            class="q-ma-sm"
            :size="'md'"
          >
            <q-menu anchor="top left" self="bottom left">
              <q-list style="min-width: 100px">
                <q-item v-close-popup clickable style="padding: 0; min-height: 40px">
                  <q-item-section class="text-uppercase text-center text-primary"
                    >Выйти</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="full-height q-pa-md">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
.custom_header {
  min-height: 60px !important;
  height: 100px !important;
}
.absolute-center {
  position: absolute;
  left: 50%;
  top: 50%; /* центр по вертикали */
  transform: translate(-50%, -50%); /* смещение по обеим осям */
}
</style>
