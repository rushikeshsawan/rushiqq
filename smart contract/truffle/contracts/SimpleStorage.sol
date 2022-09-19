// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage{
uint[] already_exist;
uint[] done;
struct data{
string brand;
string Rated_Current;
string Switch_Operation;
string Module_Size;
string material;
string Country_of_Origin;
string color;
uint manu_date;
uint warranty_start;
uint warranty_end;
uint warr_period;
}

uint private notsold;
uint private sold;
uint private year=2022;
mapping(uint =>mapping(uint=>data))private product;




function get_total_unsold_product() public view returns(uint){

return notsold;
}

function set_total_unsold_product(uint _unsold) public {

notsold = notsold +  _unsold;
}
function set_total_sold_product(uint _sold) public {

sold = sold +  _sold;
}



function get_total_sold_product() public view returns(uint){

return sold;
}



function set_new_product(uint productid,string memory _name,string memory Rated_Current, string memory switch_operation,uint warr_period,string memory color ,string memory module_size,string memory material,string memory coo) public{

require(bytes(product[year][productid].brand).length == 0 , "product already exists");
product[year][productid].brand=_name;
product[year][productid].Rated_Current=Rated_Current;
product[year][productid].Switch_Operation=switch_operation;
product[year][productid].manu_date=block.timestamp;
product[year][productid].warranty_start=0;
product[year][productid].warranty_end=0;
product[year][productid].warr_period=warr_period;
product[year][productid].color=color;
product[year][productid].Module_Size=module_size;
product[year][productid].material=material;
product[year][productid].Country_of_Origin=coo;

// product[year][productid]=data({brand:_name,Rated_Current:Rated_Current,Switch_Operation:switch_operation,manu_date: block.timestamp,warranty_start:0 ,warranty_end:0,warr_period:warr_period,color:color,weight:weight,length:length, Module_Size: module_size,material: material,Country_of_Origin: coo });

notsold++;
}

function set_newbatch_product(uint to,uint productid,string memory _name,string memory Rated_Current, string memory switch_operation,uint warr_period,string memory color,string memory module_size,string memory material,string memory coo) public{

for(uint i=1;i<=to;i++){
    if((product[year][productid].manu_date) != 0 ){
         already_exist.push(productid);
         productid++;
        continue;
    }else{ 
// require(bytes(product[year][productid].brand).length == 0 ,"product already exists");
product[year][productid].brand=_name;
product[year][productid].Rated_Current=Rated_Current;
product[year][productid].Switch_Operation=switch_operation;
product[year][productid].manu_date=block.timestamp;
product[year][productid].warranty_start=0;
product[year][productid].warranty_end=0;
product[year][productid].warr_period=warr_period;
product[year][productid].color=color;
product[year][productid].Module_Size=module_size;
product[year][productid].material=material;
product[year][productid].Country_of_Origin=coo;

notsold++;
done.push(productid);
productid++;
    }
}

}
function getdata()public {
    delete already_exist;
    delete done;
}
function gettdata()public view returns(uint[] memory,uint[] memory){
    return(already_exist,done);
}
function getttdata(uint num) public view returns(uint,uint){
    return(done[num],done.length);
}

function set_warranty(uint productid) public  {
     require(bytes(product[year][productid].brand).length != 0 , "product Not exists");
    require((product[year][productid].warranty_start) == 0 , "product Warranty already Registered");
uint month=2629743;
uint warr_start=block.timestamp;
uint warr_end=product[year][productid].warr_period;
if(warr_end!=0){
    warr_end=warr_start+(month*warr_end);
}else{
    warr_end=warr_start+(month*3);
}
product[year][productid].warranty_start=block.timestamp;
product[year][productid].warranty_end=warr_end;
sold++;
notsold--;
}



function get_product_details(uint id) external view returns(data memory) { 
require(bytes(product[year][id].brand).length != 0 , "user not found");
 return product[year][id];

}




}
