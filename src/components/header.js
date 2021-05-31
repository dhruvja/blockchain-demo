import React from 'react'
import {Menu} from 'semantic-ui-react'

class Header extends React.Component{
    state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render(){
        const { activeItem } = this.state
        return(
            <div class="header" >
                <Menu inverted size="huge">
                    <Menu.Item header>Blockchain</Menu.Item>
                    <Menu.Item
                    name='aboutUs'
                    active={activeItem === 'aboutUs'}
                    onClick={this.handleItemClick}
                    />
                    <Menu.Item
                    name='jobs'
                    active={activeItem === 'jobs'}
                    onClick={this.handleItemClick}
                    />
                    <Menu.Item
                    name='locations'
                    active={activeItem === 'locations'}
                    onClick={this.handleItemClick}
                    />
                </Menu>
                <h1 style={{textAlign:'center'}}>Welcome To Blockchain</h1>
            </div>
        )
    }
}

export default Header