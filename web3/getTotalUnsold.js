const Web3= require('web3');
const mycontract=require('../../react project/client/src/contracts/SimpleStorage.json');
var name = process.argv;
// get total unsold product count //

const addresses= "0xbe17681e8Ab580f10F476AC0dcaDBD493680E5B2";
const getTotalUnsold= async () => {
const provider= new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3=  new Web3(provider);
const id= await web3.eth.net.getId();
const deployednetwork= mycontract.networks[id];

const contract= new web3.eth.Contract(
mycontract.abi,
deployednetwork.address
);

const result1 =await contract.methods.get_total_unsold_product().call();
console.log("unsold products are :" + result1);
// const data= await web3.eth.getData().call();
}


getTotalUnsold();