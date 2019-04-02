import React from "react";
import Select from 'react-select';

export default class ChangeGraphComponent extends React.Component{

    props: Props;

    render(){
        const {path} = this.props;
        
        const options = [
            {value: '0', label: '3D'},
            {value: '1', label: 'P1-P2'},
            {value: '2', label: 'P2-P3'},
            {value: '3', label: 'P1-P3'}
        ]
        const customStyles = {
            control: (base, state) => ({
                ...base,
                width: "18%",
            }),
            menu: (base,state) => ({
                ...base,  
                width: "18%",
                position:"absolute",
                left:"41%",
            }),
            menuList: (base,state) => ({
                ...base,
                borderRadius: "4px",
                padding: 0,
                textAlign: 'left'
            })
        };
        
        return(
            <div>
                <Select styles={customStyles} options={options} onChange={this.props.change} defaultValue={{value: '0', label: '3D'}}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                      primary25: '#e7ffe7',
                      primary: '#074d22',
                    },
                  })}
                />
            </div>
        )
    }
}