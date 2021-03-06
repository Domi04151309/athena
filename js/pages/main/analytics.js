/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import Modal from '../../components/modal.js'

import Common from '../../helpers/common.js'
import CycleHelper from '../../helpers/cycle.js'

export default {
  name: 'analytics',
  data() {
    return {
      helper: new CycleHelper,
      cycles: [],
      stats: {}
    }
  },
  computed: {
    Common: () => Common
  },
  template:
  `<page-tab-bar>
    <div class="card p-16 mb-16">
      <div class="flex between center mb-8">
        <p class="m-0">{{ Common.getDayString(stats.cycle) }}</p><small class="p m-0">Average Cycle Length</small>
      </div>
      <div class="flex between center">
        <p class="m-0">{{ Common.getDayString(stats.period) }}</p><small class="p m-0">Average Period Length</small>
      </div>
    </div>
    <router-link v-for="(item, i) in cycles" :key="i" :to="'/analytics/cycle?i=' + (cycles.length - i - 1)" class="card p-16 red mb-16">
      <p class="m-0">
        <span v-if="!item.valid && i > 0" class="material-icons-round small">warning</span>
        {{ Common.getDayString(item.days) }}
        <small>{{ (new Date(item.start)).toLocaleDateString(...Common.simpleDateParams) }} - {{ (new Date(item.end)).toLocaleDateString(...Common.simpleDateParams) }}</small>
      </p>
      <progress :value="item.periodEnd - item.start" :max="item.end - item.start"></progress>
    </router-link>
    <router-link to="/analytics/cycle/details" class="block p-2 text-center">
      <span class="p text-center">Add previous cycle</span>
    </router-link>
  </page-tab-bar>`,
  components: {
    PageTabBar
  },
  created() {
    this.cycles = this.helper.getCycles().reverse()
    this.stats = this.helper.getStats()
  },
  mounted() {
    if (localStorage.getItem('help_analytics') == null) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Analytics Page',
          message: 'This page provides you with an overview of all your past cycles. Tap on them to view symptoms, notes, and other details.',
          positiveFunction: () => {
            localStorage.setItem('help_analytics', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
