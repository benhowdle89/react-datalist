import React          from 'react'
import DataListOption from './DataListOption'

export default class DataList extends React.Component {

    componentWillReceiveProps(props) {
        if(props.selected){
            var selected = this.props.options[props.selected],
                option = React.findDOMNode(this.refs[selected + props.selected]),
                el = React.findDOMNode(this);

            el.scrollTop = option.offsetTop;
        }
    }

    render() {
        var options = this.props.options.map((option, index) => {
            return <DataListOption 
                        key={option+index}
                        option={option} 
                        index={index} 
                        useNative={this.props.useNative} 
                        selected={this.props.selected == index} 
                        select={this.props.select}
                        ref={option+index} />
        })
        var containerStyle = {
            maxHeight: this.props.heightOfAnswers
        }
        if (!this.props.useNative) {
            if (this.props.hide) containerStyle.display = 'none'
            else if (this.props.options.length == 0) containerStyle.display = 'none'
            else containerStyle.display = 'block'
        }
        if (this.props.useNative) return (
            <datalist id={this.props.id} className={"react-datalist"}>{options}</datalist>
        )
        return (
            <div id={this.props.id} className="react-datalist" style={containerStyle}>{options}</div>
        )
    }
}
