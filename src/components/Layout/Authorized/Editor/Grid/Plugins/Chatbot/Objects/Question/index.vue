<template>
  <div class="question-border">
    <div class="question">
      <div class="question-margin">
        <div class="bot-messages" ref="messages">
          <div class="bot-message" :class="{first: index == 0}" :key="message.id" v-for="(message, index) in localValue.messages">
            <div class="delete-message" @click="deleteMessage(message.id)">
              <v-icon>close</v-icon>
            </div>
            <Editable placeholder="Message" :content="message.text" @update="message.text = $event" />
            <!-- <div v-html="message.text" @input="log($event);message.text = $event.data" @click="showInput = index" contenteditable></div> -->
          </div>
          <div class="bot-message-actions">
            <div class="add" @click="addMessage()">Add Message Variant</div>
            <div class="messages-settings" v-if="localValue.messages.length">
              <v-icon>settings</v-icon>
            </div>
          </div>
        </div>
      </div>

      <Separator @add="openControlsModal('body')" label="Body" :actions="['add']"></Separator>
      <div class="question-margin">
        <div class="question-body-wrapper">
          <Controls @calcSize="$emit('calcSize')" class="question-body" :controls="localValue.body" />
        </div>
      </div>


      <Separator @add="openControlsModal('actions')" label="Actions" :actions="['add']" />
      <Controls @calcSize="$emit('calcSize')" class="question-actions" :controls="localValue.actions" />

    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Controls from './UI/Controls'
  import ControlsSelector from './Modals/ControlsSelector'

  import controls from './settings'

  export default {
    name: "Chatbot_Question",
    props: {
      value: Object,
      default: Object
    },
    components: {
      ControlsSelector,
      Controls
    },
    mounted() {
      this.$nextTick(function () {
        [this.$refs.messages].forEach(el => {
          d3.select(el).on('mousedown', () => d3.event.stopPropagation())  
        })
      })
    },
    data () {
      this.value.messages = this.value.messages || []
      this.value.body = this.value.body || []
      this.value.actions = this.value.actions || []
      return {
        showInput: null,
        localValue: {...this.value}
      }
    },
    watch: {
      localValue: {
        handler () {
          this.$emit('input', this.localValue)
          this.$emit('calcSize')
        },
        deep: true
      }
    },
    methods: {
      openControlsModal (controlsFor) {
        this.$modal.show(ControlsSelector, {
          controls: controls[controlsFor],
          onSave: (result) => {
            this.localValue[controlsFor].push({id: Math.random(),...result})
          }
        }, {overlayClasses: ['object-editor-overlay'], transition: 'object-editor', name: 'object-editor', scrollable: true, height: "auto"})
      },
      addMessage() {
        this.localValue.messages.push({text: "", id: Math.random()})
        this.$emit('calcSize')
      },
      deleteMessage(messageId) {
        const index = this.localValue.messages.findIndex(message => message.id == messageId)
        this.localValue.messages.splice(index, 1)
        this.$emit('calcSize')
      }
    }
  }
</script>

<style scoped>
  .question-border {
    background: #605da5;
    padding: 5px;
    border-radius: 20px;
  }
  .question {
    background: white;
    border-radius: 20px;
  }

  .question-margin {
    padding: 20px;
  }

  .bot-message {
    background: #555fa6;
    padding: 15px;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    margin-bottom: 10px;
    min-width: 200px;
    position: relative;
  }

  .bot-message-actions {
    display: flex;
  }

  .add {
    color: #333;
  }

  .messages-settings {
    background: #e7e7e7;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    margin-left: 20px;
  }

  .delete-message {
    float: right;
    margin: -4px;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }

  .delete-message i {
    color: white;
  }

  .question-actions {
    height: 60px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .question-body-wrapper {
    min-height: 300px;
  }

  .question-body {
    margin: 20px 0;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
