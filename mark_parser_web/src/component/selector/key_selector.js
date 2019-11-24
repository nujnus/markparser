var basic_x_offset = 350;
var basic_y_offset = 350;
const ctrl_u_ctrl_d_distance = 5;

const key_selector = (state, action) => {
        state.group_pointer.marks[state.group_pointer.pointer_position].background_color = 
          state.group_pointer.marks[state.group_pointer.pointer_position].background_default_color;
        let scroll_x = 0;
        let scroll_y = 0;

      switch (action.payload.key){
        case "card":

          break;
        case "f":
          let f_start = state.group_pointer.marks[state.group_pointer.pointer_position].start
          if (f_start) {
            let f_end = f_start[0].end

            state.group_pointer = f_end.group
            state.group_pointer.pointer_position = state.group_pointer.marks.indexOf(f_end)
             

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y
            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)
          }
          break;
        case "b":
          let b_end = state.group_pointer.marks[state.group_pointer.pointer_position].end
          if (b_end) {
            let b_start = b_end[0].start

            state.group_pointer = b_start.group
            state.group_pointer.pointer_position = state.group_pointer.marks.indexOf(b_start)

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y
            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)
          }

          break;
        case "h":
          if(state.group_pointer.left) {

            state.group_pointer =  state.group_pointer.left;

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y

            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)
          }
          break;
        case "l":
          if(state.group_pointer.right) {

            state.group_pointer =  state.group_pointer.right;

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y

            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)

          }
          break;
        case "j":

          if(state.group_pointer.pointer_position == (state.group_pointer.marks.length - 1) && state.group_pointer.down) {

            state.group_pointer = state.group_pointer.down


            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y
            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)

          } else if(state.group_pointer.pointer_position < state.group_pointer.marks.length - 1) {
            state.group_pointer.pointer_position =  state.group_pointer.pointer_position + 1

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y

            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)

          }
            break;
        case "k":
          if(state.group_pointer.pointer_position == 0 && state.group_pointer.up) {
            state.group_pointer = state.group_pointer.up

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y
            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)

          } else if(state.group_pointer.pointer_position > 0) {

            state.group_pointer.pointer_position =  state.group_pointer.pointer_position - 1

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y
            state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)

          }
          break;
        case "gg":
          state.group_pointer.pointer_position = 0;

          scroll_x = state.group_pointer.group_x
          scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y


          state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)
          break;

        case "G":
          state.group_pointer.pointer_position = state.group_pointer.marks.length - 1;

          scroll_x = state.group_pointer.group_x
          scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y

          state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset)
          break;

        case "c-u":
          let cu_distance = state.group_pointer.pointer_position + 1;

          if (cu_distance  > ctrl_u_ctrl_d_distance) {
            state.group_pointer.pointer_position = state.group_pointer.pointer_position - ctrl_u_ctrl_d_distance;
          }
          else {
              state.group_pointer.pointer_position = 0;
          }

          scroll_x = state.group_pointer.group_x
          scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y

          state.scroll_state.scrollTo(scroll_x - basic_x_offset, scroll_y - basic_y_offset) 
          break;
        case "c-d":
          let cd_distance = state.group_pointer.marks.length - 1 - state.group_pointer.pointer_position;

          if (ctrl_u_ctrl_d_distance < cd_distance ) {

            state.group_pointer.pointer_position = state.group_pointer.pointer_position + ctrl_u_ctrl_d_distance;
          }else{

            state.group_pointer.pointer_position = state.group_pointer.marks.length - 1;

          }

          scroll_x = state.group_pointer.group_x
          scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y

          state.scroll_state.scrollTo(scroll_x  - basic_x_offset , scroll_y - basic_y_offset)
          break;
        case "c-y":
            basic_y_offset =  basic_y_offset + 50
            state.scroll_state.scrollTo(state.scroll_state.scrollLeft , state.scroll_state.scrollTop - 50)
            break;
        case "c-e":
            basic_y_offset =  basic_y_offset - 50
            state.scroll_state.scrollTo(state.scroll_state.scrollLeft , state.scroll_state.scrollTop + 50)
            break;
        case "c-h":
            basic_x_offset =  basic_x_offset + 50
            state.scroll_state.scrollTo(state.scroll_state.scrollLeft - 50 , state.scroll_state.scrollTop)
            break;
        case "c-l":
            basic_x_offset =  basic_x_offset - 50
            state.scroll_state.scrollTo(state.scroll_state.scrollLeft + 50 , state.scroll_state.scrollTop)
            break;
        case "space":

            basic_x_offset = 150;
            basic_y_offset = 0;

            scroll_x = state.group_pointer.group_x
            scroll_y = state.group_pointer.marks[state.group_pointer.pointer_position].y


            state.scroll_state.scrollTo(scroll_x  - basic_x_offset , scroll_y - basic_y_offset)
            break;

        case "e":
            break;
        case "update":
            break;
        default:
            break;
      }
        state.group_pointer.marks[state.group_pointer.pointer_position].background_color = "#FFFFCC"


        let new_key_state = {};
        Object.assign(new_key_state, state)
        return new_key_state
}

export  {key_selector}
