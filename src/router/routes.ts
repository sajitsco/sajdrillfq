import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('src/sajer/CPLayout.vue'),
    children: [{ path: 'f/bpms', component: () => import('src/sajer/BPMSPage.vue') },
      { path: 'f/admin', component: () => import('src/sajer/AdminPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
