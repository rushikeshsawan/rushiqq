
const Web3= require('web3');
const mycontract=require('../react project/client/src/contracts/SimpleStorage.json');
var name = process.argv;
// get total unsold product count //

const addresses= "0xFCC962d468847860b5812fF1265e89e099341587";
const getTotalUnsold= async () => {
const provider= new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3=  new Web3(provider);
const id= await web3.eth.net.getId();
const deployednetwork= mycontract.networks[id];

const contract= new web3.eth.Contract(
mycontract.abi,
deployednetwork.address
);

const result=await contract.methods.set_total_unsold_product(150).send({
    from: addresses,
});
const result1 =await contract.methods.get_total_unsold_product().call();
console.log("unsold products are :" + result1);
// const data= await web3.eth.getData().call();
}




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
    const result=await contract.methods.set_total_sold_product(150).send({
        from: "0xd460D5b35D2c8ff625d14dd433fD097468e834A9",
    });

    const result1=await contract.methods.get_total_sold_product().call();
    console.log("total sold products are: " + result1);
    // const data= await web3.eth.getData().call();
    }

    // set new product

  
    const setnewproduct= async () => {
        const provider= new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3=  new Web3(provider);
        const id= await web3.eth.net.getId();
        const deployednetwork= mycontract.networks[id];
        
        web3.eth.handleRevert = true;
        const contract= new web3.eth.Contract(
        mycontract.abi,
        deployednetwork.address,
        {gasPrice: '9999999', from: "0xFCC962d468847860b5812fF1265e89e099341587"}
        );
        const addresses= web3.eth.getAccounts();
        const result=await contract.methods.set_new_product(name[2],name[3],7039853955,'sawant.rushikesh10@gmail.com').send({
            from: "0xFCC962d468847860b5812fF1265e89e099341587",
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


         // Get new product
    const getproductdetails= async () => {
        const provider= new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3=  new Web3(provider);
        const id= await web3.eth.net.getId();
        const deployednetwork= mycontract.networks[id];
        
        const contract= new web3.eth.Contract(
        mycontract.abi,
        deployednetwork.address,
        {gasPrice: '9999999', from: "0xFCC962d468847860b5812fF1265e89e099341587"}
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
        {gasPrice: '9999999', from: "0xFCC962d468847860b5812fF1265e89e099341587"}
        );
        const addresses= web3.eth.getAccounts();
        const result=await contract.methods.set_warranty(name[2],name[3]).send({
            from: "0xFCC962d468847860b5812fF1265e89e099341587",
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
        


// getTotalUnsold();
getTotalsold();
try{
    // getproductdetails();
    // setproductwarranty();
    // setnewproduct();
}catch(e){
    console.log('hello');
}

// lines of code




// web3.eth.getBlockNumber().then(()=> console.log('done.!'));
// console.log(rushi);
// const rushi="hello hiee";

// console.log(rushi);