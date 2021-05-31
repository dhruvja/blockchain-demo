import React from 'react'
import {Button, Grid,Header, Icon,Segment,Form,TextArea,Input,Card} from 'semantic-ui-react'

class BlockChain extends React.Component{

    constructor(){
        super()
        this.state = {
            blocks: [
                    {
                        id: 0,
                        hash: '0000000000000000'
                    },
                    {
                        id: 1,
                        hash: '00007369143a44a4fe86c2036d221ad51fd40e0e4040c54ec4b1d7a5638592d8',
                        nonce: 0,
                        data: '',
                    },
                    {
                        id: 2,
                        hash: '0000b378cafff6182c713b55639f907e8ad7df749c64a354d8568b255caabd49',
                        nonce: 0,
                        data: '',
                    },
                    {
                        id: 3,
                        hash: '0000078dc9711f0234801d0bc5f15b661d7f17c10e13c2633fb5c725317149de',
                        nonce: 0,
                        data: '',
                    },
                    {
                        id: 4,
                        hash: '0000034a3c578c103ad8638a1ef808acf4ba91200e560de251a7e28074abcbcd',
                        nonce: 0,
                        data: '',
                    },
                    {
                        id: 5,
                        hash: '0000a4928af4dc5653f35b43687c54def7aa49541b86c4099a9b850509d1653e',
                        nonce: 448,
                        data: '',
                    },      
         ],
         loading:false
        }
        this.mineblock = this.mineblock.bind(this)
        this.calculatenonce = this.calculatenonce.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        var shajs = require('sha.js')
        const {name,value,id} = event.target
        console.log(id)
        var index = id;
        // var index = this.state.blocks.findIndex(element => element.id == id)
        var length = this.state.blocks.length
        console.log(index)
        let blockvalues = [...this.state.blocks]
        var nonce = this.state.blocks[index].nonce;
        var prevhash = this.state.blocks[index-1].hash;
        const digest = shajs('sha256').update(JSON.stringify(value)+ prevhash + index + nonce).digest('hex')
        blockvalues[index] = {
            id: index,
            hash: digest,
            data: value,
            nonce: nonce,
        }
        var i,data;
        index = Number(index)
        for(i=index+1;i<length;i++)
        {
            console.log(i);
            nonce = this.state.blocks[i].nonce;
            data = this.state.blocks[i].data;
            prevhash = this.state.blocks[i-1].hash;
            const digest = shajs('sha256').update(data + prevhash + i).digest('hex')
            blockvalues[i] = {
                id: index,
                hash: digest,
                data: data,
                nonce: nonce,
            }
        }
        this.setState({
            blocks: blockvalues,
        })

    }

    mineblock(e){
        var index = e.currentTarget.id
        var hash = this.state.blocks[index].hash;
        var prevhash = this.state.blocks[index-1].hash;
        var data = this.state.blocks[index].data;
        this.setState({ loading: true })
        setTimeout(() => {
            this.calculatenonce(hash,data,prevhash,index)
        },200);
        console.log(hash);
    }

    calculatenonce(hash,data,prevhash,index){
        var shajs = require('sha.js')
        var nonce = 0
        while(hash.substr(0,4) !== Array(5).join("0"))
            {
                nonce++;
                hash = shajs('sha256').update( index + prevhash + JSON.stringify(data) + nonce).digest('hex')
            }
        let updatedblockvalues = [...this.state.blocks];
        updatedblockvalues[index] = {
            id: index,
            hash: hash,
            nonce: nonce,
            data: data,
        }
        this.setState({
                blocks: updatedblockvalues,
                loading: false
            })
    }

    render(){
        var i=1;
        var color = [];
        console.log(typeof(i))
        for(i=1;i<6;i++)
        {
            if(this.state.blocks[i].hash.substr(0,4) !== Array(5).join("0"))
            {
                color[i] = "red";
            }
            else
                color[i] = "green"
        }
        return(
            <div className="maincontent">
                <Header as="H1" dividing>Blockchain</Header>
                <Grid columns={3} divided>
                    <Grid.Row>
                    <Grid.Column>
                    <Segment inverted color={color[1]} tertiary>
                    <Form>
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Id'
                            placeholder='id'
                            value= "1"
                            readonly
                        />
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Nonce'
                            placeholder='Nonce'
                            value={this.state.blocks[1].nonce}
                            readonly
                        />
                        <Form.Field
                            id = "1"
                            control={TextArea}
                            onChange = {this.handleChange}
                            name="data"
                            label='Data'
                            placeholder='Data'
                            rows = "10"
                            value={this.state.blocks[1].data}
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Previous Hash'
                            placeholder='Previous Hash'
                            value={this.state.blocks[0].hash}
                            readonly
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Hash'
                            placeholder='Hash'
                            value={this.state.blocks[1].hash}
                            readonly
                        />
                        {this.state.loading ? <Button loading primary>Mine</Button> : <Button id="1" onClick={this.mineblock} primary>Mine</Button>}
                    </Form>
                    <br />
                    
                    
                    </Segment>
                    </Grid.Column>
                    <Grid.Column>
                    <Segment inverted color={color[2]} tertiary>
                        <Form >
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Id'
                            placeholder='id'
                            value= "2"
                            readonly
                        />
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Nonce'
                            placeholder='Nonce'
                            value={this.state.blocks[2].nonce}
                            readonly
                        />
                        <Form.Field
                            id='2'
                            control={TextArea}
                            onChange = {this.handleChange}
                            name="data"
                            label='Data'
                            placeholder='Data'
                            rows = "10"
                            value={this.state.blocks[2].data}
                        />
                        <Form.Field
                            id='2'
                            control={Input}
                            label='Previous Hash'
                            placeholder='Previous Hash'
                            value={this.state.blocks[1].hash}
                            readonly
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Hash'
                            placeholder='Hash'
                            value={this.state.blocks[2].hash}
                            readonly
                        />
                        {this.state.loading ? <Button  loading primary>Mine</Button> : <Button id="2" onClick={this.mineblock} primary>Mine</Button>}
                    </Form>
                    <br />
                    </Segment>
                    </Grid.Column>
                    <Grid.Column>
                    <Segment inverted color={color[3]} tertiary>
                    <Form >
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Id'
                            placeholder='id'
                            value= "3"
                            readonly
                        />
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Nonce'
                            placeholder='Nonce'
                            value={this.state.blocks[3].nonce}
                            readonly
                        />
                        <Form.Field
                            id='3'
                            control={TextArea}
                            onChange = {this.handleChange}
                            name="data"
                            label='Data'
                            placeholder='Data'
                            rows = "10"
                            value={this.state.blocks[3].data}
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Previous Hash'
                            placeholder='Previous Hash'
                            value={this.state.blocks[2].hash}
                            readonly
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Hash'
                            placeholder='Hash'
                            value={this.state.blocks[3].hash}
                            readonly
                        />
                        {this.state.loading ? <Button  loading primary>Mine</Button> : <Button id="3" onClick={this.mineblock} primary>Mine</Button>}
                    </Form>
                    <br />
                    </Segment>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Segment inverted color={color[4]} tertiary>
                            <Form >
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Id'
                            placeholder='id'
                            value= "4"
                            readonly
                        />
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Nonce'
                            placeholder='Nonce'
                            value={this.state.blocks[4].nonce}
                            readonly
                        />
                        <Form.Field
                            id='4'
                            control={TextArea}
                            onChange = {this.handleChange}
                            name="data"
                            label='Data'
                            placeholder='Data'
                            rows = "10"
                            value={this.state.blocks[4].data}
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Previous Hash'
                            placeholder='Previous Hash'
                            value={this.state.blocks[3].hash}
                            readonly
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Hash'
                            placeholder='Hash'
                            value={this.state.blocks[4].hash}
                            readonly
                        />
                        {this.state.loading ? <Button  loading primary>Mine</Button> : <Button id="4" onClick={this.mineblock} primary>Mine</Button>}
                    </Form>
                    <br />
                
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                        <Segment inverted color={color[5]} tertiary>
                            <Form >
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Id'
                            placeholder='id'
                            value= "5"
                            readonly
                        />
                    <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Nonce'
                            placeholder='Nonce'
                            value={this.state.blocks[5].nonce}
                            readonly
                        />
                        <Form.Field
                            id='5'
                            control={TextArea}
                            onChange = {this.handleChange}
                            name="data"
                            label='Data'
                            placeholder='Data'
                            rows = "10"
                            value={this.state.blocks[5].data}
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Previous Hash'
                            placeholder='Previous Hash'
                            value={this.state.blocks[4].hash}
                            readonly
                        />
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Hash'
                            placeholder='Hash'
                            value={this.state.blocks[5].hash}
                            readonly
                        />
                        {this.state.loading ? <Button  loading primary>Mine</Button> : <Button id="5" onClick={this.mineblock} primary>Mine</Button>}
                    </Form>
                    <br />
                
                            </Segment>
                        </Grid.Column>


                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default BlockChain