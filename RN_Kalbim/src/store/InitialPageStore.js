import {observable, configure, action, autorun} from 'mobx'

configure( {
  enforceActions:"observed"
})

class InitialPageStore{
  
  @observable initialPage=0

  constructor(){
    autorun(()=>{console.log(`InitialStore.initialPage= "${this.initialPage}"`)})
  } 

  @action changePage  ( value ) {
    this.initialPage=value
  }
  }

export default new InitialPageStore() 