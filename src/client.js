import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
const axios = require('axios');
class DroneInput extends Component{
    constructor(props){
        super(props)
        this.state = {
            droneInstructions: '',
            droneCount:'',
            numberOfBillBoards:undefined,
            message:'',
            isValidInput:false
        }
    }
    inputCheck(){
        let regex = /^[wasdx]*$/;
        if(event.target.value <= 0){
            this.setState({
                isValidInput: false,
                message: "count should be greater than 0"
            })

        }
        else if(!event.target.value.match(regex)){
            this.setState({
                isValidInput: false,
                message:"Instruction should contain only the following characters: x, ^, v, <, >"
            });
        }else{
            this.setState({
                isValidInput: true,
                message:""
            })
        }
    }
    handleCountChange = event => {
        this.inputCheck();
		this.setState({
			droneCount: event.target.value
        })
        
	}

	handleInstructionsChange = event => {
        this.inputCheck();
		this.setState({
			droneInstructions: event.target.value
		})
	}
    URL = "http://localhost:4001/drone";
    handleSubmit = (e) => {
        this.setState({
            numberOfBillBoards:undefined
        })
        e.preventDefault();
        console.log(this.state);
        var self = this;
        axios.post("http://localhost:4001/drone", {
            droneCount:this.state.droneCount,
            droneInstructions:this.state.droneInstructions
        })
          .then(function (response) {
            self.setState({
                numberOfBillBoards: response.data.no_of_billboards
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    render(){
        const {droneInstructions, droneCount} = this.state;
        return(
        <div id="droneInput">
          <h1>Drone Input</h1>
            <form onSubmit={this.handleSubmit}>
                <label>No. Of Drones: </label>
                <input type="number" name = "count" value = {droneCount} onChange={this.handleCountChange}/>
                <br/><br/>
                <label>Instructions: </label>
                <input type="text" name = "instructions" value = {droneInstructions} onChange={this.handleInstructionsChange}/>
                <br/><br/>
                <button type="submit" disabled={!this.state.isValidInput}>Submit</button>
            </form>
           <h3>Number of Billboards photographed: {this.state.numberOfBillBoards}</h3>
           <p>{this.state.message}</p>
        </div>
        );
    }
}
// function App() {
//     const {isLoading, data} = useFetch('http://localhost:4001');
//     if(isLoading) {
//         return 'Loading...';
//     }
//     return <pre>{JSON.stringify(data, null, 4)}</pre>;
// }


ReactDOM.render(<DroneInput />, document.getElementById('app'));
