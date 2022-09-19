const Web3= require('web3');
const mycontract=require('../../react project/client/src/contracts/SimpleStorage.json');
var name = process.argv;
// get total unsold product count //


const addresses= "0x5542492304DFA4f6654EBffE2eaf12cDfB4c37aC";
 
 
 // set product warranty

  
 const setproductwarranty= async () => {
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
    const result=await contract.methods.set_warranty(name[2],name[3]).send({
        from: addresses,
        gas: 4712388,
        gasPrice: 100000000000,
    }).catch((err) => {
        // let message = JSON.parse(err.message.substring(56).trim().replace("'", "")).value.data;
        console.log("something Went Wrong Please check if product is Set.!");
       
    });

    // const result1=await contract.methods.get_product_details('12345').call();
    // console.log("Product details are: " +  result1);

    // const data= await web3.eth.getData().call();
    }
    setproductwarranty();
    