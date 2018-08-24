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
          <div class="add-message" @click="addMessage()">Add Message Variant</div>
          <div class="messages-settings" v-if="messages.length">
            <v-icon>settings</v-icon>
          </div>
        </div>
      </div>
      <div class="message-body">
        <div class="message-body-label">Content</div>
        <div class="message-body-list">
          <div class="message-body-item" :key="type" v-for="type in ['image', 'checkboxList', 'radioList', 'video']" @click="addContent()">
            <div>{{type}}</div>
          </div>
        </div>
      </div>
    </div>
    <draggable class="message-actions" v-model="actions">
      <component :key="action.id" v-for="action in actions" :is="action.type" :settings="item"></component>
    </draggable>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import ChatbotButton from './Chatbot/Button'
  import ChatbotSelect from './Chatbot/Select'
  import ChatbotInput from './Chatbot/Input'
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
      })
    },
    data () {
      return {
        showInput: null,
        messages: this.data.info.component.messages || [],
        content: this.data.info.component.content || [],
        actions: this.data.info.component.actions || []
      }
    },
    methods: {
      addMessage() {
        this.messages.push({text: "message", id: Math.random()})
        this.$nextTick(function () {
          this.$emit('calcSize')
        })
      },
      addContent() {
        this.content.push({text: "message", id: Math.random()})
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

  .add-message, .messages-settings {
    background: #e7e7e7;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
  }

  .add-message {
    width: 100%;
  }

  .messages-settings {
    margin-left: 20px;
    color: #333;
  }

  .chatbot-actions {
    display: flex;
    padding: 14px;
    justify-content: space-between;
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

  .message-body-list {
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
  }
  .message-body {
    padding: 10px;
    margin: 40px 0;
    border: 1px dashed #e7e7e7;
  }
  .message-body-item {
    padding: 5px 10px;
    background: #df4e9e;
    margin: 5px;
    color: white;
    display: inline-block;
    cursor: pointer;
  }

  .message-body-label {
    float: left;
    margin-top: -16px;
    background: white;
    display: block;
    height: 10px;
    font-size: 12px;
    color: #b7b7b7;
    margin-left: 0px;
    padding: 0 5px;
  }

  .message-actions {
    height: 60px;
    border-top: 1px solid #e7e7e7;
  }
</style>
