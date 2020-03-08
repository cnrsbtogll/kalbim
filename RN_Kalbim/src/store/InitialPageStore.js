import {observable, configure, action, autorun} from 'mobx'

configure( {
  enforceActions:"observed"
})

class InitialPageStore{
  // observable(initialPage);
  @observable initialPage=""

  constructor(){
    autorun(()=>{console.log(`InitialStore.initialPage= "${this.initialPage}"`)})
  } 

  @action changeName  ( value ) {
    this.initialPage=value
  }
}
export default new InitialPageStore() 