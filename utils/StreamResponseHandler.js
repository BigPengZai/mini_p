// 定义一个类来管理接收到的数据和输出状态
class StreamResponseHandler {
  constructor() {
    this.buffer = ''; // 用于存储接收到的数据块
    this.currentMessage = ''; // 当前正在处理的消息
    this.currentIndex = 0; // 当前输出到哪个字符
  }

  // 接收到数据块时调用的方法
  onChunkReceived(chunk) {
    this.buffer += chunk; // 将新接收到的数据块追加到缓冲区
    this.processBuffer(); // 处理缓冲区中的数据
  }

  // 处理缓冲区中的数据
  processBuffer() {
    const lines = this.buffer.split('\n\n'); // 使用两个换行符作为分隔符
    if (lines.length > 1) {
      this.currentMessage = lines[0]; // 更新当前消息
      this.buffer = lines.slice(1).join('\n\n'); // 剩余的数据保留在缓冲区
      this.outputMessage(); // 输出消息
    }
  }

  // 逐字输出消息
  outputMessage() {
    if (this.currentIndex < this.currentMessage.length) {
      // 逐字输出，这里使用setTimeout模拟逐字效果
      setTimeout(() => {
        console.log(this.currentMessage[this.currentIndex]); // 输出当前字符
        this.currentIndex++; // 更新当前索引
        this.outputMessage(); // 递归调用，继续输出下一个字符
      }, 100); // 每隔100毫秒输出一个字符
    }
  }
}
exports.StreamResponseHandler = StreamResponseHandler;
