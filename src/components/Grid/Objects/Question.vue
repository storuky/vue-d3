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
      <div class="section" ref="controls">
        <div class="section-label">Available Controls</div>
        <div class="controls-list">
          <draggable :options="{group: {name: 'controls', put: false}}" class="alowed-controls" v-model="controls">
            <div class="control-item" :key="control.type" v-for="control in controls">
              <div>{{control.name}}</div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <div class="message-actions-wrapper" ref="actions">
      <div class="section-label">Actions</div>
      <!-- <div class="message-actions-empty">Drag and Drop Control</div> -->
      <draggable :options="{group:'controls'}" class="message-actions" v-model="actions">
        <component :key="action.id" v-for="action in actions" :is="action.type" :settings="action.settings"></component>
      </draggable>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import ChatbotButton from './Chatbot/Button'
  import ChatbotSelect from './Chatbot/Select'
  import ChatbotInput from './Chatbot/Input'
  import controls from './Chatbot/controls'
  import draggable from 'vuedraggable'

  export default {
    name: "Chatbot",
    props: {
      data: Object,
      default: Object
    },
    components: {
      ChatbotButton,
      ChatbotSelect,
      ChatbotInput,
      draggable
    },
    mounted() {
      this.$nextTick(function () {
        d3.select(this.$refs.messages).on('mousedown', () => d3.event.stopPropagation())
        d3.select(this.$refs.controls).on('mousedown', () => d3.event.stopPropagation())
        d3.select(this.$refs.actions).on('mousedown', () => d3.event.stopPropagation())
      })
    },
    data () {
      return {
        showInput: null,
        messages: this.data.info.component.messages || [],
        content: this.data.info.component.content || [],
        actions: this.data.info.component.actions || [],
        controls
      }
    },
    watch: {
      controls (val, old) {
        if (val.length < old.length) {
          this.controls = old
        }
      }
    },
    methods: {
      addMessage() {
        this.messages.push({text: "message", id: Math.random()})
        this.$nextTick(function () {
          this.$emit('calcSize')
        })
      },
      addAction() {
        this.actions.push({type: "ChatbotButton", id: Math.random()})
        this.$nextTick(function () {
          this.$emit('calcSize')
        })
      },
      deleteMessage(messageId) {
        this.messages = this.messages.filter(message => message.id != messageId)
        this.$nextTick(function () {
          this.$emit('calcSize')
        })
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

  .messages-settings {
    margin-left: 20px;
    color: #333;
  }

  .message-actions {
    display: flex;
    padding: 14px;
    justify-content: space-between;
    height: 100%;
  }

  .message-actions .control-item {
    width: 100%;
    background: #f5f5f5 !important;
    color: #333 !important;
    height: 37px;
    margin: 0;
    text-align: center;
    padding: 10px;
  }

  .bot-message-actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .delete-message {
    float: right;
    margin: -4px;
    cursor: pointer;
  }

  .controls-list {
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
  }
  .section {
    margin: 40px 0;
    border: 1px dashed #e7e7e7;
  }
  .control-item {
    padding: 5px 10px;
    background: #e7e7e7;
    border: 1px solid #cecdcd;
    border-radius: 3px;
    margin: 5px;
    color: #333;
    display: inline-block;
    cursor: pointer;
  }

  .control-item.sortable-chosen {
    background: #555fa6;
    color: white;
  }

  .message-actions-empty {
    color: #ccc;
    text-align: center;
    padding: 18px;
  }

  .message-actions-wrapper .section-label {
    margin-top: -15px;
    margin-left: 25px;
    transform: translateY(8px);
  }
  .message-actions-wrapper {
    height: 60px;
    border-top: 1px solid #e7e7e7;
  }
</style>
