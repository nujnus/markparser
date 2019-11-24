function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      var r;
 
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}


class global_var {
    static project_id = "";
    static card_id = "";
}


class CurrentWindowId {
  constructor(current_window_id){
      this.current_window_id = current_window_id;
  }
  compare(window_id) {
    return  this.current_window_id == window_id
  }

  id () {
      return  this.current_window_id;
  }


}

class ActionInterruptor {
    constructor(interruptor_list){
        this.interruptor_list = interruptor_list;
        this.interrupt_flag = true;
    }

    filter(action){
        if ( (action == undefined) || (!this.interrupt_flag) && (this.interruptor_list.includes(action.type))) {
            return undefined;
        } else {return action}}

    open_to_traffic(){
        this.interrupt_flag = true;
    }

    close_to_traffic(){
        this.interrupt_flag = false;
    }
}

const interruptor_list =  ["GET_REMOTE_KEY_REQUESTED", "GET_REMOTE_KEY_SUCCESS", "GET_REMOTE_KEY_FAILURE"]
const action_interruptor = new ActionInterruptor(interruptor_list)
const current_window_id = new CurrentWindowId(uuid(32,32));


export {uuid, global_var, action_interruptor, current_window_id}
