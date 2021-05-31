import React from 'react'
import {Button, Header, Icon,Segment,Form,TextArea,Input} from 'semantic-ui-react'


class Block extends React.Component{
    constructor(){
        super()
        this.state = {
            data: '',
            hash: '',
            nonce: 0,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.mineblock = this.mineblock.bind(this)
    }

    handleChange(event){
        var shajs = require('sha.js')
        var date = new Date()
        date = date.getTime()
        console.log(date)
        const digest = shajs('sha256').update(event.target.value).digest('hex')
        console.log(event.target.value)
        this.setState({
            data: event.target.value,
            hash: digest,
            date: date ,
        })
        console.log(this.state.date)
    }

    mineblock(){
        var hash = this.state.hash;
        var data = this.state.data;
        this.setState({ loading: true })
        setTimeout(() => {
            this.calculatenonce(hash,data)
        },200);
        console.log(hash);
    }

    calculatenonce(hash,data){
        var shajs = require('sha.js')
        var nonce = 0
        while(hash.substr(0,4) !== Array(5).join("0"))
            {
                nonce++;
                hash = shajs('sha256').update(JSON.stringify(data) + nonce).digest('hex')
            }
        this.setState({
                hash: hash,
                nonce: nonce,
                loading:false
            })
    }

    render(){
        var color;
        var load;
        if(this.state.hash.substr(0,4) !== Array(5).join("0"))
            color = "red";
        else
            color = "green";

        this.state.loading ? load = "loading" : load="" 
        
        return (
            <div class="maincontent" >
                <br />
                <Header as="h1" dividing>Block</Header>
                <Segment inverted color={color} tertiary>
                    <Header as="h3" dividing>
                        SHA 256 Hash Block
                    </Header>
                    <br />
                    <Form>
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Nonce'
                            placeholder='Nonce'
                            value={this.state.nonce}
                            readonly
                        />
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
                    
                    {this.state.loading ? <Button loading primary>Mine</Button> : <Button primary onClick={this.mineblock} >Mine</Button>}

                    
                    
                </Segment>
            </div>
        )
    }
}

export default Block
