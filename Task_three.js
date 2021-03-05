const axios= require('axios');
const web3= require('web3');
var _balancerec=0;
var _balancesend=0;
var _totalbalance=0;
var _gasprice=0;

// axios.get("https://api.etherscan.io/api?module=account&action=txlistinternal&address=0x93fc9E0F191B6916C9713d7B6095002681F923ef&startblock=0&endblock=999999999&sort=asc&apikey=RQ83XPC9R4JQ9GJFXMIGXFEHZIY1SG1E5V"
//     ).then(resp =>
//         {
        
//             { for(i=0;i<resp.data.result.length;i++)
//             {
//                 if(resp.data.result[i].to=="0x93fc9e0f191b6916c9713d7b6095002681f923ef")
//                 {    
//                     _balancerec +=Number(web3.utils.fromWei(resp.data.result[i].value.toString()));
//                 } 
//             }
        
//         }
//     }
// );

// axios.get(
//     "https://api.etherscan.io/api?module=account&action=tokentx&address=0x93fc9E0F191B6916C9713d7B6095002681F923ef&startblock=0&endblock=999999999&sort=asc&apikey=RQ83XPC9R4JQ9GJFXMIGXFEHZIY1SG1E5V"
//     ).then(resp =>
//         {
        
//         for(i=0;i<resp.data.result.length;i++)
//         {
//             if (resp.data.result[i].from =="0x93fc9e0f191b6916c9713d7b6095002681f923ef")
//             {
//                  var temp=(Number(resp.data.result[i].gasPrice))*(Number(resp.data.result[i].gasUsed));
//                  _gasprice+=Number(web3.utils.fromWei(temp.toString()));
//             }
//         }
        
//         }
// );

axios.get(
   "https://api.etherscan.io/api?module=account&action=txlist&address=0x2e5309aee0ab5614691de24197faf69e23d24928&startblock=0&endblock=999999999&sort=asc&apikey=RQ83XPC9R4JQ9GJFXMIGXFEHZIY1SG1E5V"
   ).then(resp =>
    {
       
             for(i=0;i<resp.data.result.length;i++)
            {
              if(resp.data.result[i].to=="0x2e5309aee0ab5614691de24197faf69e23d24928")
                {    
                    _balancerec +=Number(web3.utils.fromWei(resp.data.result[i].value.toString()));
                } 
            }
        
            for(i=0;i<resp.data.result.length;i++)
                {
                      if (resp.data.result[i].from =="0x2e5309aee0ab5614691de24197faf69e23d24928" && resp.data.result[i].isError==0)
                        {  
                           _balancesend += Number(web3.utils.fromWei(resp.data.result[i].value.toString()));
                         }
         
                }
       
              for(i=0;i<resp.data.result.length;i++)
                {
                    if (resp.data.result[i].from =="0x2e5309aee0ab5614691de24197faf69e23d24928" && resp.data.result[i].isError==0)
                    {
                         var temp=(Number(resp.data.result[i].gasPrice))*(Number(resp.data.result[i].gasUsed));
                         _gasprice+=Number(web3.utils.fromWei(temp.toString()));
                    }
                }
    _totalbalance=(_balancerec -_balancesend)
       console.log("Balance rev:",_balancerec+" Balance Send",_balancesend+" total gasprice:",_gasprice);
       console.log("Total Balance:",_totalbalance-_gasprice)
     }  
     );



