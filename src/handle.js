import React, {Component} from 'react'

import PropTypes from 'prop-types'
import { Button } from 'antd'
export default class Handle extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            age: '',
            handleFlag:false,
            btnVal:'+ add'
        }
    }

    render(){
        let name = this.state.name;
        let age = this.state.age;
        let btn = this.props.modifyPerson?
                        <button onClick={this.modifyAction.bind(this)}>修改</button>:
                        <button onClick={this.addAction.bind(this)}>新增</button>;
        return (
            <div>
                <div className="btn">
                    <Button type="primary" onClick = {this.handleShow.bind(this)}>{this.state.btnVal}</Button>
                </div>
                <div className="handle"style={{display:this.state.handleFlag?"":"none"}}>
                    
                    <input ref="name" type="text" value={name} onChange={this.inputChange.bind(this, 'name')}/>
                    <br/>
                    <input ref="age" type="number" value={age} onChange={this.inputChange.bind(this, 'age')}/> 
                    <br/>               
                    {btn}
                </div>
            </div>
        )
    }
    handleShow(){
        this.setState({handleFlag: !this.state.handleFlag});
    }
    inputChange(flag){
        let val = this.refs[flag].value;
        let obj = {};
        obj[flag] = val;
        this.setState(obj);
    }

    addAction(){
        console.log('新增点击了');
        console.log(this.state);

        //将新增的值传递给父组件
        this.props.handleAdd({
            name: this.state.name,
            age: this.state.age
        });

        //清空输入框
        this.setState({
            name: '',
            age: ''
        });
    }

    modifyAction(){
        console.log('修改点击了');
        //将修改完毕的值传递给父组件
        this.props.handleModify({
            name: this.state.name,
            age: this.state.age
        });

        //清空输入框
        this.setState({
            name: '',
            age: ''
        });
    }

    componentWillReceiveProps(newProps){
        console.log('将要接收到属性');
        if(newProps.modifyPerson){
            //将外部的props中的modifyPerson值赋值给state中的name， age，输入框才能显示
            this.setState({
                name: newProps.modifyPerson.name,
                age: newProps.modifyPerson.age
            });
        }
    }
}

Handle.propTypes = {
    handleAdd: PropTypes.func.isRequired,
    modifyPerson: PropTypes.object,
    handleModify: PropTypes.func
}