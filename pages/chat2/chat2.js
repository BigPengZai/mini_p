const settings_index = require("../../settings/index.js");
Page({
  data: {
   
    scrollTop: 0, // 滚动视图的滚动位置
    inputValue: '', // 输入框的值
    loading: false, // 是否正在加载数据
    messages: [], // 存储消息数组
    currentContent: '', // 完整的消息内容
    displayContent: '', // 当前显示的消息内容
    isTyping: false, // 是否正在逐字显示
    fullContent: '', // 用于存储完整消息内容
  },
  // 开始逐字显示消息
  startTyping: function (content) {
    this.setData({
      currentContent: content,
      displayContent: '', // 清空当前显示内容
      isTyping: true,
    });
    this.typeEffect(); // 开始逐字效果
  },
  // 逐字显示效果
  typeEffect: function () {
    if (this.data.displayContent.length < this.data.currentContent.length) {
      let newContent = this.data.displayContent + this.data.currentContent[this.data.displayContent.length];
      this.setData({
        displayContent: newContent,
      });
      setTimeout(() => {
        this.typeEffect();
      }, 100); // 每隔100ms添加一个字符
    } else {
      // 逐字显示完成，等待新内容或结束
      if (!this.data.isTyping && this.data.currentContent.length > this.data.displayContent.length) {
        this.setData({
          isTyping: true
        });
        this.typeEffect();
      } else {
        this.setData({
          isTyping: false,
        });
        // 将消息添加到消息数组中
        this.addMessage(this.data.currentContent);
      }
    }
  },
  // 将消息添加到消息数组中
  addMessage: function (content) {
    const messages = this.data.messages;
    messages.push({
      content: content
    });
    this.setData({
      messages: messages
    });
  },
  // 处理输入事件
  onInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  // 发送消息
  sendMessage: function () {
    const value = this.data.inputValue;
    if (value.trim()) {
      // 假设发送消息的逻辑
      // 发送消息后清空输入框
      this.setData({
        inputValue: '',
        fullContent:'',
        displayContent:'',
        isTyping: false,
        currentContent: '',
      });
    }

    this.getDataStream(value);
  },
  getDataStream(prompt) {
    const that = this;
    this.setData({
      loading: true,
      fullContent: '', // 清空临时存储内容
    });
    const requestTask = wx.request({
      enableChunked: true,
      url: `${settings_index.settings.host}/chat/stream-gpt?prompt=${encodeURIComponent(prompt)}`,
      method: "GET",
      responseType: "arraybuffer",
      timeout: '120000',
      success(res) {
        // 请求成功的处理逻辑
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function () {
        that.setData({
          loading: false
        });
      }
    });
    requestTask.onChunkReceived(res => {
      const text = this.decodeChunk(new Uint8Array(res.data));
      console.log('text:::', text);

      // 拼接接收到的数据
      this.setData({
        fullContent: this.data.fullContent + text,
        currentContent: this.data.currentContent + text
      });

      // 如果没有在显示逐字效果，则开始逐字显示
      if (!this.data.isTyping) {
        this.startTyping(this.data.currentContent);
      }
    });
  },

  decodeChunk(uint8Array) {
    let result = '';
    for (let i = 0; i < uint8Array.length; i++) {
      result += String.fromCharCode(uint8Array[i]);
    }
    try {
      return decodeURIComponent(escape(result));
    } catch (e) {
      console.error('Error decoding chunk:', e);
      return result;
    }
  },
  // 页面滚动到底部
  onPageScroll: function (e) {
    if (e.scrollTop >= 50) {
      this.setData({
        scrollTop: e.scrollTop
      });
    }
  }
});
