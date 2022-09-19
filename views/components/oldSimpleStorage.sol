// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage{

struct data{
string brand;
string Rated_Current;
string Switch_Operation;
string Module_Size;
string material;
string Country_of_Origin;
string color;
string weight;
string length;
uint manu_date;
uint warranty_start;
uint warranty_end;
uint warr_period;
}
uint private notsold;
uint private sold;
uint private year=2022;
mapping(uint =>mapping(string=>data))private product;




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



function set_new_product(string memory productid,string memory _name,string memory Rated_Current, string memory switch_operation,uint warr_period,string memory color,string memory weight, string memory length,string memory module_size,string memory material,string memory coo) public{

require(bytes(product[year][productid].brand).length == 0 , "product already exists");

product[year][productid]=data({brand:_name,Rated_Current:Rated_Current,Switch_Operation:switch_operation,manu_date: block.timestamp,warranty_start:0 ,warranty_end:0,warr_period:warr_period,color:color,weight:weight,length:length, Module_Size: module_size,material: material,Country_of_Origin: coo });

notsold++;
}


function set_warranty(string memory productid) public  {
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



function get_product_details(string memory id) external view returns(data memory) { 
require(bytes(product[year][id].brand).length != 0 , "user not found");
 return product[year][id];

}




}
