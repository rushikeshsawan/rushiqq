const Web3= require('web3');
const mycontract=require('../../react project/client/src/contracts/SimpleStorage.json');
var name = process.argv;
// get total unsold product count //


const addresses= "0x5542492304DFA4f6654EBffE2eaf12cDfB4c37aC";

const getproductdetails= async () => {
    const provider= new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    const web3=  new Web3(provider);
    const id= await web3.eth.net.getId();
    const deployednetwork= mycontract.networks[id];
    
    const contract= new web3.eth.Contract(
    mycontract.abi,
    deployednetwork.address,
    {gasPrice: '9999999', from: "0x5542492304DFA4f6654EBffE2eaf12cDfB4c37aC"}
    );
    // const addresses= web3.eth.getAccounts();
    // const result=await contract.methods.set_new_product('12345','rushi',7039853955,'sawant.rushikesh10@gmail.com').send({
    //     from: "0xFCC962d468847860b5812fF1265e89e099341587",
    //     gas: 4712388,
    //     gasPrice: 100000000000,
    // });

    const result1=await contract.methods.get_product_details(name[2]).call();
    console.log("Product details are: " +  result1);
    // const data= await web3.eth.getData().call();
    }
    getproductdetails();