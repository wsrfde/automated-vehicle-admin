import { defineStore } from 'pinia';
import { CraneState } from './types';

const useCraneStore = defineStore('crane', {
  state: (): CraneState => ({
    taskList: [],
  }),
  getters: {
    getTaskList(state: CraneState) {
      return state.taskList;
    },
  },
  actions: {
    changeTaskList(payload) {
      console.log(payload);
    },
  },
});

export default useCraneStore;
