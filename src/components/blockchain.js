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
                        hash: '00006851b221ec03fa09ab34495fa46d1a634997a556a96e4f0611b8c4aa8005',
                        nonce: 209713,
                        data: '',
                    },
                    {
                        id: 2,
                        hash: '00003728d39f4341102d28bc571c0cc6727816e46330853f941913030a11f439',
                        nonce: 37352,
                        data: '',
                    },
                    {
                        id: 3,
                        hash: '00002d9c027ec266807e8a056962f6086c63730d35f9578f18f33c923014da40',
                        nonce: 113460,
                        data: '',
                    },
                    {
                        id: 4,
                        hash: '0000c3107144ce935b5c2b992c40e15156a0af96f454a55242284473727ce85e',
                        nonce: 22632,
                        data: '',
                    },
                    {
                        id: 5,
                        hash: '000043c99df8ae502f92f8c972dd7e0f387a7898815031f5624a63b363e0e2eb',
                        nonce: 8501,
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
        console.log("data:" + value)
        console.log("prevhash:" + prevhash)
        console.log("index:" + index)
        console.log("nonce" + nonce)
        const digest = shajs('sha256').update(index + prevhash + value + nonce).digest('hex')
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
            const digest = shajs('sha256').update(index + prevhash + data + nonce).digest('hex')
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
                hash = shajs('sha256').update( index + prevhash + data + nonce).digest('hex')
            }
        let updatedblockvalues = [...this.state.blocks];
        console.log("data:" + data)
        console.log("prevhash:" + prevhash)
        console.log("index:" + index)
        console.log("nonce" + nonce)
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