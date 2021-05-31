import React from 'react'
import {Button, Header, Icon,Segment,Form,TextArea,Input} from 'semantic-ui-react'


class Hash extends React.Component{
    constructor(){
        super()
        this.state = {
            data: '',
            hash: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        var shajs = require('sha.js')
        const digest = shajs('sha256').update(event.target.value).digest('hex')
        console.log(event.target.value)
        this.setState({
            data: event.target.value,
            hash: digest,
        })
        console.log(this.state.date)
    }

    render(){        
        return (
            <div class="maincontent" >
                <br />
                <Header as="h1" dividing>
                    Hashing
                </Header>
                <Segment inverted tertiary>
                    <Header as="h3" dividing>
                        SHA256 Hashing
                    </Header>
                    <br />
                    <Form>
                        <Form.Field
                            id='form-textarea-control-opinion'
                            control={TextArea}
                            onChange = {this.handleChange}
                            name="data"
                            label='Data'
                            placeholder='Data'
                            rows = "10"
                            value={this.state.data}
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Hash'
                            placeholder='Hash'
                            value={this.state.hash}
                            readonly
                        />
                    </Form>
                    <br />                    
                </Segment>
            </div>
        )
    }
}

export default Hash
