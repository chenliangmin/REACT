import React, {Component} from 'react'

import PropTypes from 'prop-types'

export default class List extends Component{
    render(){
        return (
            <ul className="list">
                {
                    this.props.data.map((item, index)=>{
                        return (
                            <li key={index}>
                                <h3>姓名：{item.name}</h3>
                                <p>年龄：{item.age}</p>
                                <button onClick={this.modifyAction.bind(this, index)}>修改</button>
                                <button onClick={this.deleteAction.bind(this, index)}>删除</button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    modifyAction(index){
        console.log('修改'+index);
        this.props.handleListByIndex(index, 'modify');
    }

    deleteAction(index){
        console.log('删除'+index);
        this.props.handleListByIndex(index, 'delete');
    }
}

//配置外部接收到了属性的校验规则
List.propTypes = {
    data: PropTypes.array.isRequired,
    handleListByIndex: PropTypes.func.isRequired
}