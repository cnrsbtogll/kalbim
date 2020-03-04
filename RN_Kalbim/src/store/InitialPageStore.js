import {observable, configure} from 'mobx'

configure( {
  enforceActions:"observed"
})
class InitialPageStore{
  @observable  initialPage=0;

}
export default new InitialPageStore() 