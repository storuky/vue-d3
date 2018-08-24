<template>
  <div class="question">
    <div class="question-margin">
      <div class="bot-messages" ref="messages">
        <div class="bot-message" :class="{first: index == 0}" :key="message.id" v-for="(message, index) in messages">
          <div class="delete-message" @click="deleteMessage(message.id)">
            <v-icon>close</v-icon>
          </div>
          <div v-html="message.text" @input="$emit('calcMinSize')" @click="showInput = index" contenteditable></div>
        </div>
        <div class="bot-message-actions">
          <div class="add" @click="addMessage()">Add Message Variant</div>
          <div class="messages-settings" v-if="messages.length">
            <v-icon>settings</v-icon>
          </div>
        </div>
      </div>
    </div>

    <Separator @add="openControlsModal('body')" label="Body"></Separator>
    <div class="question-margin">
      <div class="question-body-wrapper">
        <Controls @calcSize="$emit('calcSize')" class="question-body" :controls="body" />
      </div>
    </div>


    <Separator @add="openControlsModal('actions')" label="Actions" />
    <Controls @calcSize="$emit('calcSize')" class="question-actions" :controls="actions" />

  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Separator from './Chatbot/Separator'
  import Controls from './Chatbot/Controls'
  import ControlsSelector from '../../modals/ControlsSelector'

  import controls from './Chatbot/controlsList'
  import draggable from 'vuedraggable'

  export default {
    name: "Chatbot",
    props: {
      data: Object,
      default: Object
    },
    components: {
      Separator,
      ControlsSelector,
      Controls,
      draggable
    },
    mounted() {
      this.$nextTick(function () {
        [this.$refs.messages].forEach(el => {
          d3.select(el).on('mousedown', () => d3.event.stopPropagation())  
        })
      })
    },
    data () {
      return {
        showInput: null,
        messages: this.data.info.component.messages || [],
        body: this.data.info.component.body || [],
        actions: this.data.info.component.actions || [],
        body: this.data.info.component.body || []
      }
    },
    methods: {
      openControlsModal (controlsFor) {
        this.$modal.show(ControlsSelector, {
          controls: controls[controlsFor],
          onSave: (result) => {
            this[controlsFor].push(result)
            this.$emit('calcSize')
          }
        })
      },
      addMessage() {
        this.messages.push({text: "message", id: Math.random()})
        this.$emit('calcSize')
      },
      addAction() {
        this.actions.push({type: "ChatbotButton", id: Math.random()})
        this.$emit('calcSize')
      },
      deleteMessage(messageId) {
        this.messages = this.messages.filter(message => message.id != messageId)
        this.$emit('calcSize')
      }
    },
    computed: {
      width () {
        return this.data.size.width || this.defaule.size.width
      },
      height () {
        return this.data.size.height || this.defaule.size.height
      },
      footer () {
        return this.data.info.component.content.footer
      }
    }
  }
</script>

<style scoped>
  .question {
    background: white;
    border: 5px solid #555fa6;
    border-radius: 20px;
  }

  .question-margin {
    margin: 20px;
  }

  .bot-message {
    background: #555fa6;
    padding: 15px;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    margin-bottom: 10px;
    min-width: 200px;
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
