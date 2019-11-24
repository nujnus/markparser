import React from 'react';
import _ from 'lodash';
import  Immutable from "immutable"
import { Map, is } from 'immutable'
import memoizer from 'fast-memoize'





function permutation(array){
  let results = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
        results.push([array[i], array[j]]);
    }
  }
  return results;
}


function permutation2(array1, array2){
  let results2 = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      results2.push({"start": array1[i], "end": array2[j]});
    }
  }
  return results2;
}

function coordinate_relationship_calc(state, file_pair) {
  let results_for_coordinate = file_pair.map( v => {
    let distance =  Math.pow((v[0].group_x - v[1].group_x), 2) + Math.pow((v[0].group_y - v[1].group_y), 2)
      return {from: v[0], to: v[1], distance}})

  results_for_coordinate = results_for_coordinate.filter(v => v.distance !== 0) 


  state.fileData.files = state.fileData.files.map( f => {
      f.distances = results_for_coordinate.filter(v => v.from == f);

      let maybe_right = f.distances.filter(d => {return ((d.to.group_x - f.group_x) > 0) })
      maybe_right =  _.sortBy(maybe_right, (d)=>{return d.distance})[0]
      if (maybe_right) {f.right =  maybe_right.to} else {f.right = null}

      f.distances = results_for_coordinate.filter(v => v.from == f);
      let maybe_left = f.distances.filter(d => {return ((d.to.group_x - f.group_x) < 0) })
      maybe_left =  _.sortBy(maybe_left, (d)=>{return d.distance})[0]
      if (maybe_left) {f.left = maybe_left.to} else {f.left = null}

      let maybe_up = f.distances.filter(d => {return ((d.to.group_y - f.group_y) < 0) })
      maybe_up =  _.sortBy(maybe_up, (d)=>{return d.distance})[0]
      if (maybe_up) {f.up =  maybe_up.to} else {f.up = null}

      let maybe_down = f.distances.filter(d => {return ((d.to.group_y - f.group_y) > 0) })
      maybe_down =  _.sortBy(maybe_down, (d)=>{return d.distance})[0]
      if (maybe_down) {f.down = maybe_down.to} else {f.down = null}

      return f;
  })
  return state;
}

class MarkIterator {
  constructor(filename, comments) {
    this.filename = filename;
    this.comments = comments;
  }
  [Symbol.iterator] () {
    let cs = [];  
    const comments = this.comments;
    const filename = this.filename;
    for (let c in  this.comments) {
      cs.push(c)
    }
    let i = 0;
    return { 
      next() {
        if (i >= cs.length) return {value: undefined, done: true};
          return { value: {filename: filename, mark_id: cs[i], meta: comments[cs[i++]]}, done: false} //标题, 注释, 行号
      }
    }
  }
}

class DataToFileIterator {
  constructor(card_id) {
    this.state = card_id;
  }
  [Symbol.iterator] () {
    let xs = []  
    const data = this.state
    for (let x in  this.state) {
      xs.push(x)
    }
    let i = 0;
    return { 
      next() {
        if (i >= xs.length) return {value: undefined, done: true};
          return { value: {filename: xs[i], marks: Array.from(new MarkIterator(xs[i], data[xs[i++]]))}, done: false}
      }
    }
  }
}
const file_to_array = (marks) => {
    let fileIterator = new DataToFileIterator(marks)
    return  Array.from(fileIterator).filter((fileObj)=> fileObj.marks.length !== 0)
}

const init_file_pos_and_sort_mark = (files) => {
    return files.map((file, index) => {
      file.pointer_position = 0;
      file.marks =  _.sortBy(file.marks, (item)=>{return item.meta["linenum"][0]})
      return file;
    })
}

const mark_init_pos = (files) => {

   files = files.map((file, findex)=> {file.marks = file.marks.map((markData, mindex) =>{
       markData.split_title = markData.meta.title.match(/.{1,15}/g);

       if (markData.split_title) {
         markData.meta.title = markData.split_title.join("\n")
         markData.height = markData.split_title.length
       } else {markData.height = 1}
         markData.x= 0;
         markData.group = file;
         markData.color = "black";
         markData.background_default_color = "white";
         markData.background_color = "white";
         markData.start = [];
         markData.end = [];
       return markData}) ;return file;})

   files.forEach((item, i) =>{
         item.marks.reduce((sumheight, mark)=> {
           mark.y = sumheight
           sumheight = mark.y  + mark.height * 20
           return sumheight;}, 20) })

    return files;
}

const flat_marks = (files) => {
    let allmarks = files.map((f, index)=> {
      return f.marks;
    })
    allmarks = allmarks.flat()

    let allmarks_map = {}
    allmarks.forEach(function(mark) {
        allmarks_map[mark.mark_id] = mark;
    });
    return  allmarks_map;
}

const init_card = (saved_info, flat_marks, card_id) => {
    let all_cards_history =  saved_info.cards;

    for (let mark_id in flat_marks){
        flat_marks[mark_id].background_color = "white";
        flat_marks[mark_id].background_default_color = "white";
    };

    let card_array = [];
    console.log("init_card", saved_info)
    all_cards_history[card_id].forEach((cardItem) => {
      card_array.push(flat_marks[cardItem.mark_id])
    })

    card_array.forEach((cardItem)=>{
       cardItem.background_color = "red";
       cardItem.background_default_color = "red";})

    return card_array;
}

const load_coordinate_info = (files, saved_info) => {
    files = files.map((file, findex)=> {

    if (saved_info.coordinate){
        if (saved_info.coordinate.hasOwnProperty(file.filename)){
          file.group_x = saved_info.coordinate[file.filename][0];
          file.group_y = saved_info.coordinate[file.filename][1];

      }}else{
        file.group_x = 10;
        file.group_y = 10;
    }
    return file})
    return files
}

const map_selector =  (_marks, _saved_info, card_id) => {
        console.log("map_selector_test run again 2")

        let marks = Immutable.fromJS(_marks).toJS()
        let saved_info = Immutable.fromJS(_saved_info).toJS()


        let state = {}
        state.fileData = {}
        state.fileData.cards = {card1:[], card2:[], card3:[], card4:[], card5:[]}

        state.fileData.files = mark_init_pos(init_file_pos_and_sort_mark(file_to_array(marks)))
        state.allmarks = flat_marks(state.fileData.files)
        state.fileData.cards[card_id] = init_card(saved_info, state.allmarks, card_id)
        state.fileData.files = load_coordinate_info(state.fileData.files, saved_info)


    
        state.fileData.files.reduce((lastfileData, fileData)=> {
          fileData.left = lastfileData;
          if (lastfileData) { lastfileData.right = fileData; }
          fileData.right = null;
          return fileData;
        }, null)


        state.group_pointer =  state.fileData.files[0];


        let results = [];
   
        results = permutation(state.fileData.files);

        state = coordinate_relationship_calc(state, results);

        results = results.map(v=> permutation2(v[0].marks, v[1].marks));

        results = results.flat(); 
    
        state.lines =
          results.filter(v => v.start.mark_id !== v.end.mark_id).filter(v=> v.start.mark_id.replace(/-ref/, '') == v.end.mark_id.replace(/-begin/, ''))
        state.lines.map((element, i) => {
            element.start.start.push(element)
            element.end.end.push(element)
        })


        return  Object.assign({}, state)
}



const map_selector_converge = memoizer((marks, saved_info, card_id, flag) => {

    console.log("map_selector_test run again")
    let result = memoizer(map_selector)(marks, saved_info, card_id)
    result.flag = flag
    return result
})

export {map_selector_converge, map_selector, permutation, permutation2, coordinate_relationship_calc, MarkIterator, DataToFileIterator}
