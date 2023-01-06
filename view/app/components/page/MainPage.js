import card from '../card.js'

export default {

    template: /* template */`
    <div>
    <card title="新情报速递" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
    <card title="最近游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
    <card title="所有游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
  </div>
    `,
    components: { card }
}