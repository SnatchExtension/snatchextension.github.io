
// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class SnatchJoke{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('SnatchJoke', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'SnatchJoke',
      name: 'Snatch (Joke Blocks)',
      color1: '#69af9a',
      color2: '#2c413b',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'snj_rickroll',
          blockType: BlockType.COMMAND,
          text: 'rickroll current user'
        },
        {
          opcode: 'snj_random',
          blockType: BlockType.BOOLEAN,
          text: 'randomly select true or false'
        }
      ]
    }
  }

snj_rickroll (args, util){
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

snj_random (args, util){
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  if (getRandomInt(2) == 1){
    return false
  }
  else{
    return true
  }
}

cppComm(gen){
  gen.includes_['SnatchJoke'] = '#include "YourHeader.h"';
  gen.definitions_['SnatchJoke'] = 'YourClass object;';
};
mpyComm(gen){
  gen.includes_['SnatchJoke'] = 'import YourClass';
};
}

module.exports = SnatchJoke;
