import {create} from "zustand"

interface taskstore{
  todo:string[]
  inprogress:string[]
  done:string[]
}

const  usetaskstore= create<taskstore>(()=>({
  todo:[],
  inprogress:[],
  done:[]
}))

export default usetaskstore