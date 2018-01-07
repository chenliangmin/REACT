import React, { Component } from 'react';

import './App.css';


import Handle from './handle'
import List from './tables'

class App extends Component {
  constructor(){
    super();
    this.state = {
      listData: [],
      modifyPerson: null,
      modifyIndex: -1,
      
      
    }
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <div>
            Welcome to Webridge
          </div>  
        </div>
        
        <Handle handleAdd={this.addPersonMethod.bind(this)}
          handleModify={this.modifyPersonMethod.bind(this)}
          modifyPerson={this.state.modifyPerson} />
        <List data={this.state.listData} 
          handleListByIndex={this.handleListByIndex.bind(this)}/>
      </div>
    );
  }
  
  addPersonMethod(personInfo){
    console.log('父级的addPerson方法触发了');
    console.log(personInfo);
    this.state.listData.push(personInfo);
    this.setState({listData: this.state.listData});
  }
  modifyPersonMethod(newPersonInfo){
    //真正的执行修改操作
    //1.删除原来的数据,插入修改好的数据
    this.state.listData.splice(this.state.modifyIndex, 1, newPersonInfo);
    //2.执行setState，更新dom
    this.setState({listData: this.state.listData});

    //将修改的判断条件归置为初始状态
    this.setState({
        modifyPerson: null,
        modifyIndex: -1
    });
  }
  handleListByIndex(index, flag){
    if(flag == 'delete'){
        //真正删除操作
        this.state.listData.splice(index, 1);
        this.setState({listData: this.state.listData})
    }
    else if(flag == 'modify'){
        //记录哪个需要修改的操作
        //1取出需要修改的值
        let modifyPerson = this.state.listData[index];
        //2.告诉handle显示出来需要修改的值
        this.setState({modifyPerson, modifyIndex: index});

    }
  }
}

export default App;

