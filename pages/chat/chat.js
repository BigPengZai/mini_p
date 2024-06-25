
Page({
  data: {
    talkArr: [], // 存储对话数组
    inputValue: '', // 输入框的值
    loading: false, // 是否正在加载数据
    currentContent: '', // 当前逐字显示的内容
    inputBottom: 0, // 输入框位置
  },

  onShow() {
    this.setData({
      talkArr: [
        { id: 1, content: "你好", isAnswer: "0" },
        { id: 2, content: "你好，我是通义千问", isAnswer: "1" }
      ],
      currentContent: "你好，我是通义千问",
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
      // 清空数据以便发送新消息
      this.setData({
        inputValue: '',
        fullContent: '',
        currentContent: '',
        isTyping: false,
      });
      
      // 添加用户的消息
      const talkArr = this.data.talkArr;
      talkArr.push({
        content: value,
        isAnswer: '0'
      });
      this.setData({
        talkArr: talkArr
      });
    }
  },

});
