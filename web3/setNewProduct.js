const Web3= require('web3');
const mycontract=require('../../react project/client/src/contracts/SimpleStorage.json');
var name = process.argv;
// get total unsold product count //


const addresses= "0xbe17681e8Ab580f10F476AC0dcaDBD493680E5B2";

const setnewproduct= async () => {
    const provider= new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    const web3=  new Web3(provider);
    const id= await web3.eth.net.getId();
    const deployednetwork= mycontract.networks[id];
    
    web3.eth.handleRevert = true;
    const contract= new web3.eth.Contract(
    mycontract.abi,
    deployednetwork.address,
    {gasPrice: '9999999', from: addresses}
    );
    const addresse= web3.eth.getAccounts();
    const result=await contract.methods.set_new_product(name[2],name[3],7039853955,'sawant.rushikesh10@gmail.com').send({
        from: addresses,
        gas: 4712388,
        gasPrice: 100000000000,
    }).catch((err) => {
        // let message = JSON.parse(err.message.substring(56).trim().replace("'", "")).value.data;
        console.log("something Went Wrong Please check if product already exist.!");
       
    });

    // const result1=await contract.methods.get_product_details('12345').call();
    // console.log("Product details are: " +  result1);

    // const data= await web3.eth.getData().call();
    }

    setnewproduct();