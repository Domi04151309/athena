/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import CycleHelper from '../helpers/cycle.js'

function formatDate(date) {
  if (date == null) return
  const d = new Date(date)
  return d.getFullYear() + '-'
    + String(d.getMonth() + 1).padStart(2, '0') + '-'
    + String(d.getDate()).padStart(2, '0')
}

export default {
  name: 'cycle-details',
  data() {
    return {
      index: 0,
      helper: {}
    }
  },
  template:
  `<page title="Cycle">
    <div class="text-center"><span class="very-big accent material-icons-round mb-16">water_drop</span></div>
    <p class="text-center mt-0 mb-16">Enter your period's details below.</p>
    <label for="start">Period Start</label>
    <input ref="start" id="start" class="mb-16" type="date"></input>
    <label for="end">Period End</label>
    <input ref="end" id="end" class="mb-16" type="date"></input>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    onFabClicked() {
      if (this.$refs.start.value == '') {
        const ComponentClass = Vue.extend(Modal)
        const instance = new ComponentClass({
          propsData: {
            title: 'Enter A Starting Time',
            message: 'Please enter a starting time first.',
            negativeButton: false
          }
        })
        instance.$mount()
        this.$root.$el.appendChild(instance.$el)
      } else {
        this.helper.periods[this.index][0] = (new Date(this.$refs.start.value)).getTime()
        this.helper.periods[this.index][1] = (new Date(this.$refs.end.value)).getTime()
        this.helper.save()
        this.$router.push('/analytics')
      }
    }
  },
  created() {
    this.helper = new CycleHelper()
    if (this.$route.query.i == null) {
      this.index = this.helper.periods.length
      this.helper.periods.push([null, null])
    } else {
      this.index = this.$route.query.i
    }
  },
  mounted() {
    this.$refs.start.value = formatDate(this.helper.periods[this.index][0])
    this.$refs.end.value = formatDate(this.helper.periods[this.index][1])
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
