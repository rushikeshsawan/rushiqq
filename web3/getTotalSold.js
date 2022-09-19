const Web3= require('web3');
const mycontract=require('../../react project/client/src/contracts/SimpleStorage.json');
var name = process.argv;
// get total unsold product count //

const addresses= "0xFCC962d468847860b5812fF1265e89e099341587";


// get total sold product

const getTotalsold= async () => {
    const provider= new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    const web3=  new Web3(provider);
    const id= await web3.eth.net.getId();
    const deployednetwork= mycontract.networks[id];
    
    const contract= new web3.eth.Contract(
    mycontract.abi,
    deployednetwork.address
    );
    const addresses= web3.eth.getAccounts();
   

    const result1=await contract.methods.get_total_sold_product().call();
    console.log("total sold products are: " + result1);
    // const data= await web3.eth.getData().call();
    }

    getTotalsold();