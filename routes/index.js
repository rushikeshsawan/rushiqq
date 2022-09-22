const express = require('express');
const router = express.Router();
var database = require('../database');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const moment = require('moment');
var qr = require('qr-image');
const crypto = require("crypto")
const encrypt = (plainText, password) => {
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + '-' + encrypted.toString('hex');
  } catch (error) {
    console.log(error);
  }
}
const decrypt = (encryptedText, password) => {
  try {
    const textParts = encryptedText.split('-');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedData = Buffer.from(textParts.join(':'), 'hex');
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    const decrypted = decipher.update(encryptedData);
    const decryptedText = Buffer.concat([decrypted, decipher.final()]);
    return decryptedText.toString();
  } catch (error) {
    console.log(error)
  }
}


router.post('/signup', encoder, function (req, res, next) {

  if (req.body.name && req.body.pass && req.body.email) {

    let name = req.body.name;
    let pass = req.body.pass;
    let email = req.body.email;
    let q = `SELECT * FROM userlogin where email="${email}"`;
    database.query(q, function (error, data) {
      if (data.length > 0) {
        res.render("index", {
          error: "Email Already Exists .!",
          status: "",
          session: req.session
        });
        res.end();
        // console.log("user already exist.!");
      } else {
        q = `INSERT INTO userlogin( name, email, pass) VALUES ('${name}','${email}','${pass}')`;
        database.query(q, function (error, data) {
          if (data) {
            res.render("index", {
              error: "",
              status: "user Registered Successfully.!",
              session: req.session
            });
            res.end();
          }
        });

      }

    });
  }
});
const Web3 = require('web3');
const mycontract = require('../smart contract/client/src/contracts/SimpleStorage.json');
const mycontractt = "0x25450a840B504cb1Bde85E61463e446F8890dDAB";
var name = process.argv;

router.post('/login', encoder, function (req, res, next) {



  (async () => {

    const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c');
    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    // const deployednetwork = mycontract.networks[id];

    const sold = await getTotalsold(req.session.addre);
    const unsold = await getTotalUnsold(req.session.addre);


    let account = req.body.acc;

    if (account == "undefined") {
      account = null;
    }
    // console.log(account);
    let email = req.body.email;
    let password = req.body.password;
    if (email && password) {
      const q = `SELECT * FROM userlogin where email="${email}"`;
      database.query(q, function (error, data) {

        if (data.length > 0) {
          for (var count = 0; count < data.length; count++) {
            if (data[count].email == email) {

              if (data[count].pass == password) {
                req.session.uid = data[count].id;
                req.session.user_id = data[count].name;
                req.session.addre = account;
                // req.session.addre = "0x25450a840B504cb1Bde85E61463e446F8890dDAB";
                sess = req.session;

                res.redirect('/welcome');


                
                // res.render("welcome", {
                //     session: req.session,
                //     sold: sold,
                //     unsold: unsold,
                //     pid: "",
                //     pname: "",
                //     pemail: "",
                //     pmobile: "",
                //     pmau: "",
                //     pws: "",
                //     pwe: "",
                //     msg: ""

                // });

              } else {
                res.render("index", {
                  status: "",
                  error: "password Incorrect",
                  session: req.session
                });



              }
            } else {
              res.render("index", {
                status: "",
                error: "password Incorrect",
                session: req.session
              });




            }

          }
        } else {
          res.render("index", {
            status: "",
            error: "Email Incorrect",
            session: req.session
          });



        }

       


      })


    } else {

      res.render("index", {
        error: "please check username and password"
      });

    }

  })();


});

// if(req.session.addre){
// export function setProvider () => {
//     if (window.ethereum) {
//       const ethereum = window.ethereum
//       const web3Provider = new Web3(ethereum)

//       /* make web3Provider available to your entire app now */
//     }
//   }
// (async () => {
//     const accounts = await ethereum.request({ method: "eth_requestAccounts" });
//     console.log(accounts[0]);

// })();

//   async function getacc() {
//     // return "Hello";
//   }
//   await getacc();

// let addre=sess.addre;
// }else{
// addre="0xBdd138A5c31E981549a0449c224b1a3BA32745E1";
// }










// var session = require('express-session');

// 

// get total unsold product count //
// ./../react project/client/src/contracts/SimpleStorage.json







// get total sold product

async function getTotalsold(addre) {
  if (addre != null) {


    const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c');
    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    // const deployednetwork = mycontract.networks[id];
   
    const contract = new web3.eth.Contract(
      mycontract.abi,
      mycontractt
    );
    const addresses = web3.eth.getAccounts();


    const result1 = await contract.methods.get_total_sold_product().call();
    // console.log("total sold products are: " + result1);
    // const data= await web3.eth.getData().call();
    return await result1;




  } else {
    return "Please Connect Your Metamask";
  }


}


// get total unsold product
async function getTotalUnsold(addre) {

  if (addre != null) {

    const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c');
    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    // const deployednetwork = mycontract.networks[id];
  
    const contract = new web3.eth.Contract(
      mycontract.abi,
      mycontractt
    );


    const result1 = await contract.methods.get_total_unsold_product().call();
    // console.log("unsold products are :" + result1);
    // const data= await web3.eth.getData().call();
    return result1;



  } else {
    return "Please Connect Your Metamask";
  }

}

// get product Details..!!
async function getproductdetails(productiddd, addre) {

  if (addre != null) {

    try {
      const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c');
      const web3 = new Web3(provider);
      const id = await web3.eth.net.getId();
      // const deployednetwork = mycontract.networks[id];
      // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      // const account = accounts[0];
      // console.log("console from product details here" + account);
      const contract = new web3.eth.Contract(
        mycontract.abi,
        mycontractt,
        { gasPrice: '9999999', from: addre }
      );

      const result1 = await contract.methods.get_product_details(productiddd).call().then(result => { return result });
      console.log("Product details are: " + result1);
      return result1;
    } catch (error) {
      // console.log(error);
      return false;
    } c
  } else {
    return "Please Connect Your Metamask";
  }
  // const data= await web3.eth.getData().call();
}


// set new product 






// set new product 




//  console.log(await getTotalsold());


// module.exports=getTotalsold;




router.get("/", function (req, res) {

  res.render("index", {
    error: "",
    session: req.session,
    status: ""
  });

  res.end();
  
  // console.log(req.session);
});
router.get("/favicon.ico", function (req, res) {

  res.render("index", {
    error: "",
    session: req.session,
    status: ""
  });

  res.end();
  
  // console.log(req.session);
});

function totime(timee) {
  if (timee == 0) {
    return "";
  }
  var day = moment.unix(timee); //seconds
  return day.format('Do MMMM dddd YYYY, h:mm:ss a');


  // if(timee==0){
  //     return "";
  // }
  // const unixTime = timee;
  // const date = new Date(unixTime*1000);
  // return date.toLocaleDateString("en-IN");
  // console.log("time here.!!!"+ date.toLocaleDateString("en-US"));
}

router.post('/productdetails', encoder, function (req, res) {
  (async () => {
    const sold = await getTotalsold(req.session.addre);
    const unsold = await getTotalUnsold(req.session.addre);
    const piid = req.body.productid.toString();
    let productidd = await getproductdetails(piid, req.session.addre);
    // console.log(productidd.warr_period);
    if (productidd == false) {
      productidd.name = "product not found";
      productidd.email = "product not found";
      productidd.mobile = "product not found";

    }

    // try{

    // }catch(e){
    // }

    // console.log("hello hiee"+productidd.name);
    // console.log(productidd.mobile);
    // productid = productidd.split(',');
    res.json({
      productdetails: true,
      success: productidd
    });



    res.end();
  })();
});

router.post('/getdistributerdetails',encoder,(request,response)=>{
    
let did= request.body.did;
let query = `SELECT * FROM distributers WHERE id= ${did}`;
database.query(query, function (error, data) {
  if(data){
    response.json({
      distributerdata: data[0].dmobile
      });

  }else{
    response.json({
      error: "error"
      });

  }


});

});


router.post('/addbatchproduct', encoder, function (req, response) {


  const Provider = require('@truffle/hdwallet-provider');
  const MyContract = require('../smart contract/client/src/contracts/SimpleStorage.json');
  const address = '0x8e8Ef3E7D09D1fE0683f9B782860Bb00e41DE660';
  const privateKey = '4925f96bd005d94c76b3646593aba2615f4b65b197160bdf96ce9a586d41067e';
  const infuraUrl = 'https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c';

  (async () => {
    let successvar = [];
    let unsuccessvar = [];
    let from = req.body.from;
    let to = req.body.to;
let did;
let dmobile= req.body.dmobile;
    // const sold = await getTotalsold(req.session.addre);
    // const unsold = await getTotalUnsold(req.session.addre);

    // let productid = req.body.pid;
    let distributer= req.body.distributer;
    console.log(distributer);
    if (!Number.isInteger(parseInt(distributer))){
      let query = `INSERT INTO distributers( uid,dname,dmobile) VALUES ('${req.session.uid}','${distributer}','${dmobile}')`;
      database.query(query, function (error, data) {
        console.log(query);
did=data.insertId;
        // console.log("database error for distributers->" + error);
        // console.log("database success for distributers->" + data.insertId);

      });

      console.log("DISTRIBUTER not an integer");
    } else {
      did= parseInt(distributer);
      console.log("DISTRIBUTER its an integer");

    }
    let bname = req.body.bname;
    let color = req.body.color;
    let weight = req.body.weight;
    let length = req.body.length;
    let period = parseInt(req.body.period);
    let rcurrent = req.body.rcurrent;
    let soperation = req.body.soperation;
    let msize = req.body.msize;
    let material = req.body.material;
    let coo = req.body.coo;
    let productid = req.body.pid;
    productid = parseInt(productid);
    if (!Number.isInteger(productid) && !Number.isInteger(period)) {
      
      console.log("not an integer");
    } else {
      console.log("its an integer");

    }
    let uniii;

    // 
    let addre = req.session.addre;
    // addre = "0xe770a391f8B1bbe96E388Fc4202c39C3Ea773656";
    if (addre != null) {
      let success = 0;
      let unsuccess = 0;
      // let productid=1000000;

      const provider = new Provider(privateKey, infuraUrl);
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      console.log("networkid->", networkId);
      web3.eth.handleRevert = true;
      const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
      );



      const addresses = web3.eth.getAccounts();
      console.log(addresses);
      web3.eth.signTransaction({
        from: addre,
        gasPrice: "999999999",
        gas: "67123880",
        to: mycontractt,
        value: "",
        data: ""
      }).then(console.log).catch(console.log);

      web3.eth.handleRevert = true;
      // const contract = new web3.eth.Contract(
      //     mycontract.abi,
      //     mycontractt,
      //     { gasPrice: '9999999', from: addre }
      // );
      // const addresses = web3.eth.getAccounts();
      // console.log("from ->"+ i);

      // console.log("productid ->"+ productid+ " Brand Name -> "+bname+ " Rcurrent -> "+rcurrent+ " soperation -> "+soperation+ " period->  "+period+ " color-> "+color+" weight->  "+weight+" length-> "+ length+" msize->" +msize+ " material->"+material+" coo-> "+coo);
      const result = await myContract.methods.set_newbatch_product(to, parseInt(productid), bname, rcurrent, soperation, parseInt(period), color, msize, material, coo).send({
        from: addre
      }).then((result1) => {
        console.log("set new batch result ->" + result1);
        (async () => {

          let res = await myContract.methods.gettdata().call().then((resp) => {
            // console.log(res['1'].length);
            // console.log(resp['1']);
            // console.log(resp['0']);

            unsuccessvar = resp['0'];
            successvar = resp['1'];

            for (let i = 0; i < resp['1'].length; i++) {
              let enc = String(encrypt(resp['1'][i], "Rushikesh"));
              // let desc= decrypt(enc,"Rushikesh");
              // console.log("encrypted text",enc);
              // console.log("decrypted text",desc);
              // console.log("this is working tooo");
              let manu_date = Math.floor(Date.now() / 1000);
              // console.log("product id for successfull transfer " + resp['1'][i]);
              let urllink = "https://www.autic.com/productid=" + enc;
              console.log(urllink);
              var qr_png = qr.image(urllink, { type: 'png' });
              qr_png.pipe(require('fs').createWriteStream('assets/Images/qrimages/' + enc + '.png'));
              var png_string = qr.imageSync(urllink, { type: 'png' });
              let query = `INSERT INTO product_details( user_id, product_id, bname,rcurrent,soperation,manu_date,period,color,msize,material,coo,qr_encrypt,dname) VALUES ('${req.session.uid}','${resp['1'][i]}','${bname}','${rcurrent}','${soperation}','${manu_date}','${period}','${color}','${msize}','${material}','${coo}','${enc}','${did}')`;
              database.query(query, function (error, data) {

                console.log("database error" + error);
                console.log("database success" + data);

              });

              // response.send([resp['0']]);

              // console.log(query);

            }



            (async () => {
              let res1 = await myContract.methods.getdata().send({
                from: addre
              }).then((result1) => {

                console.log("result get data-> " + JSON.stringify(result1));
              }).catch((err) => {
                console.log("error here" + err);
              });

            })();


            response.json({
              addbatchproduct: "addbatchproduct",
              unsuccessful: unsuccessvar,
              successful: successvar,

              // successfullvar: successvar,
              // unsuccessfullvar: unsuccessvar,
              // success: success,
              // unsuccess: unsuccess,
              // status: true,
              // productid: productid
            });

          });
        })();



        // JSON.stringify(result1);



        // console.log("mobile number is "+ mobile);

        // database.query(query, function (error, data) {
        //     if (data) {
        //         // let tx_id = '0x8d8574d549898bae3eaf9306aab2ff80d46324418df4e0adf5b1c4911182b7c6'
        //         web3.eth.getTransactionReceipt(result.transactionHash).then(result => {
        //             //    console.log(result.input);

        //             let query1 = `INSERT INTO transactiondetails( product_id,uid,transactionhash, transactionIndex, blockHash,blockNumber,from_address,to_address,gasUsed,cumulativeGasUsed,date) VALUES ('${productid}','${req.session.uid}','${result.transactionHash}','${result.transactionIndex}','${result.blockHash}','${result.blockNumber}','${result.from}','${result.to}','${result.gasUsed}','${result.cumulativeGasUsed}','${manu_date}')`;
        //             // console.log(query1);
        //             database.query(query1, function (error, data) {
        //                 if (data) {
        //                     success++;

        //                     // console.log("transaction details added successfully.");
        //                 }

        //             });

        //         });
        //     }

        // });



      }).catch((err) => {
        // console.log(err);
        unsuccess++;
        response.json({
          addbatchproduct: "addbatchproduct",
          unsuccessful: err,
          successful: err,

          // successfullvar: successvar,
          // unsuccessfullvar: unsuccessvar,
          // success: success,
          // unsuccess: unsuccess,
          // status: true,
          // productid: productid
        });
      });






    } else {
      return false;
    }

  })();
});

// add new product 

router.post('/addnewproduct', encoder, function (req, res) {
  const Provider = require('@truffle/hdwallet-provider');
  const MyContract = require('../smart contract/client/src/contracts/SimpleStorage.json');
  const address = '0x8e8Ef3E7D09D1fE0683f9B782860Bb00e41DE660';
  const privateKey = '4925f96bd005d94c76b3646593aba2615f4b65b197160bdf96ce9a586d41067e';
  const infuraUrl = 'https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c';
  (async () => {
    const sold = await getTotalsold(req.session.addre);
    const unsold = await getTotalUnsold(req.session.addre);

    let productid = req.body.pid;
    let bname = req.body.bname;
    let color = req.body.color;
    // let weight = req.body.weight;
    // let length = req.body.length;
    let period = req.body.period;
    let rcurrent = req.body.rcurrent;
    let soperation = req.body.soperation;
    let msize = req.body.msize;
    let material = req.body.material;
    let coo = req.body.coo;
    // 
    let addre = req.session.addre;
    if (addre != null) {

      const provider = new Provider(privateKey, infuraUrl);
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      console.log("networkid->", networkId);
      web3.eth.handleRevert = true;
      const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
      );



      const addresses = web3.eth.getAccounts();
      console.log(addresses);
      web3.eth.signTransaction({
        from: addre,
        gasPrice: "4712388",
        gas: "4712388",
        to: mycontractt,
        value: "",
        data: ""
      }).then(console.log).catch(console.log);
      const result = await myContract.methods.set_new_product(productid, bname, rcurrent, soperation, parseInt(period), color, msize, material, coo).send({
        from: addre,
      }).then((result) => {
        // console.log("add new product console" + result.transactionHash);
        JSON.stringify(result);
        let enc = String(encrypt(productid, "Rushikesh"));
        let manu_date = Math.floor(Date.now() / 1000);
        let urllink = "https://www.autic.com/productid=" + enc;
        var qr_png = qr.image(urllink, { type: 'png' });
        qr_png.pipe(require('fs').createWriteStream('assets/Images/qrimages/' + enc + '.png'));
        var png_string = qr.imageSync(urllink, { type: 'png' });

        // console.log("mobile number is "+ mobile);
        let query = `INSERT INTO product_details( user_id, product_id, bname,rcurrent,soperation,manu_date,period,color,msize,material,coo,qr_encrypt) VALUES ('${req.session.uid}','${productid}','${bname}','${rcurrent}','${soperation}','${manu_date}','${period}','${color}','${msize}','${material}','${coo}','${enc}')`;
        // console.log(query);
        database.query(query, function (error, data) {
          if (data) {
            // let tx_id = '0x8d8574d549898bae3eaf9306aab2ff80d46324418df4e0adf5b1c4911182b7c6'
            web3.eth.getTransactionReceipt(result.transactionHash).then(result => {
              //    console.log(result.input);

              let query1 = `INSERT INTO transactiondetails( product_id,uid,transactionhash, transactionIndex, blockHash,blockNumber,from_address,to_address,gasUsed,cumulativeGasUsed,date) VALUES ('${productid}','${req.session.uid}','${result.transactionHash}','${result.transactionIndex}','${result.blockHash}','${result.blockNumber}','${result.from}','${result.to}','${result.gasUsed}','${result.cumulativeGasUsed}','${manu_date}')`;
              // console.log(query1);
              database.query(query1, function (error, data) {
                if (data) {
                  console.log(data);
                  res.json({
                    status: true,
                    productid: productid
                  });
                }else{
                  console.log("error ->"+error);
                  console.log("query1 ->"+query1);
                }

              });

            });

          }

        });




      }).catch((err) => {

        console.log("error message ->" + err.message.blockHash);

        res.json({
          status: false,
          productid: productid
        });



      });

    } else {
      return false;
    }

  })();
});
//  add new product end 


// when login is success



// router.get("/distributersdata", function (req, res) {
 
  
// console.log(dataaa);

router.get("/welcome", function (req, res) {
  
    
  //   console.log("dq here-> "+ JSON.stringify(dq));
  // });


  (async () => {
    let dq;
    let dataa;
    let q = `SELECT * FROM distributers ORDER BY id DESC`;
    database.query(q, function (error, dsbase) {
    
  
      if(dsbase){
  
        if (dsbase.length > 0) {
          dq = dsbase;
           
          // console.log(data);
  
        }
      }

    
    let q = `SELECT * FROM transactiondetails`;
    database.query(q, function (error, data) {
    

      if(data){

        if (data.length > 0) {
          dataa = data;
          // console.log(data);
  
        }
      }
   
    });
  });

    const sold = await getTotalsold(req.session.addre);
    const unsold = await getTotalUnsold(req.session.addre);


    


    dataa = JSON.stringify(dataa);
    // console.log("distributers here.!!!"+dq);
// let hwww=JSON.parse(dq);
// console.log(hwww);
    // console.log(req.session.addre);
    res.render("welcome", {
      session: req.session,
      sold: sold,
      unsold: unsold,
      pid: "",
      pname: "",
      pemail: "",
      pmobile: "",
      pmau: "",
      pws: "",
      pwe: "",
      msg: dataa,
      color: "",
      period: "",
      weight: dq,
      length: ""
    });




  })();
});





// 

router.get('/apigeneration', encoder, function (req, res) {
  (async () => {
    const piid = req.body.productid.toString();
    const status = true;
    var msg;
    if (status == true) {
      msg = "Success";
    } else {
      msg = "UnSuccess";

    }
    // res.send([productid,email,bname,mobile]);
    res.send([status, msg, piid]);

    res.end();

  })();
});
// 




module.exports = router;