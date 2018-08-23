<template>
  <div class="chatbot" :style="{minWidth: width + 'px', minHeight: height + 'px'}">
    <div class="bot-messages">
      <div class="bot-message" :class="{first: index == 0}" :key="message.id" v-for="(message, index) in messages" v-html="message.text"></div>
      <div class="bot-message-actions">
        <div class="add-message" @click="addMessage()">Add Message</div>
        <div class="messages-settings" v-if="messages.length">
          <v-icon>settings</v-icon>
        </div>
      </div>
    </div>
    <div class="body"></div>
    <draggable class="chatbot-actions" v-model="data.info.component.actions">
      <component :key="action.id" v-for="action in data.info.component.actions" :is="item.type" :settings="item"></component>
    </draggable>
  </div>
</template>

<script>
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
    data () {
      return {
        messages: this.data.info.component.messages || []
      }
    },
    methods: {
      addMessage() {
        this.messages.push({text: "message", id: Math.random()})
        this.$nextTick(function () {
          this.$emit('calcMinSize')
        })
      }
    },
    computed: {
      // messages () {
      //   return this.data.info.component.messages || ["lol"]
      // },
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
  .chatbot {
    background: white;
    border: 5px solid #555fa6;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  }

  .bot-message {
    background: #555fa6;
    padding: 15px;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
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
  }
</style>
