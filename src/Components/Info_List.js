import React, { useState } from 'react'
import Obj_Func,{without_invest,calculate_loan_amount} from '../Folder/Functions';


export default function Info_List() {
  const [cost,updatecost] = useState(0);
  const [Loan_interest_rate,updateLoan_interest_rate] = useState(0);
  //const [min_tenure,updatemin_tenure] = useState(0);
  const min_tenure = 1
  const [max_tenure,updatemax_tenure] = useState(0);
  const [Investment_interest_rate,updateInvestment_interest_rate] = useState(0);
  const [savings,updatesavings] = useState(0);
  const [min_downpayment,updatemin_downpayment] = useState(0);
  const [emi_limit,updateemi_limit] = useState(0);

  //const [retcost,updateretcost] = useState(0);
  //_c -> credit;_nc -> nocredit;
  const [display,updatedisplay] = useState(false);
  const [final_cost_wth_inv,updatefinal_cost_wth_inv] = useState(0);
  const [tenure_wth_inv,updatetenure_wth_inv] = useState(0);
  const [downpaypercent_wth_inv,updatedownpaypercent_wth_inv] = useState(0);

  const [cost_output ,updatecost_output] = useState(0);
  const [Loan_interest_rate_output ,updateLoan_interest_rate_output] = useState(0);
  //const [min_tenure_output ,updatemin_tenure_output] = useState(0);
  const [max_tenure_output ,updatemax_tenure_output] = useState(0);
  const [Investment_rate_output ,updateInvestment_rate_output] = useState(0);
  const [savings_output ,updatesavings_output] = useState(0);
  const [min_downpayment_output ,updatemin_downpayment_output] = useState(0);
  const [emi_limit_output ,updateemi_limit_output] = useState(0);

  const [final_cost_wout_inv ,updatefinal_cost_wout_inv] = useState(0);
  const [tenure_wout_inv ,updatetenure_wout_inv] = useState(0);

  const [toggle_text ,updatetoggle_text] = useState(0);



  //var final_cost
 

  const submit=(e)=>{
    e.preventDefault()
    var min_emi = (calculate_loan_amount(cost-savings,Loan_interest_rate,max_tenure))/(max_tenure*12)
    var min_emi_str = parseFloat(min_emi.toFixed(2)).toLocaleString('en-IN', { style: 'decimal' })
    console.log(min_downpayment)
    if (!cost||!Loan_interest_rate||!min_tenure||!max_tenure||!Investment_interest_rate||!savings||isNaN(min_downpayment)||!emi_limit)
    {
      updatedisplay(false)
      alert("Please fill all the fields")
      
    }
    else if(min_emi>emi_limit){
      updatedisplay(false)
      alert("Minimum emi should be "+min_emi_str)

    }

    else if(savings<min_downpayment*0.01*cost){
      updatedisplay(false)
      alert("Savings is less than minimum required downpayment of "+min_downpayment+"% of cost")

    }
    else if(savings>cost){
      updatedisplay(false)
      alert("Savings needs to be less than the cost")

    }
    else{
    updatedisplay(true)
    //updateretcost(Obj_Func(cost,Loan_interest_rate,min_tenure,max_tenure,Investment_interest_rate,savings,min_downpayment,emi_limit))
    var output=Obj_Func(cost,Loan_interest_rate,min_tenure,max_tenure,Investment_interest_rate,savings,min_downpayment,emi_limit)
    
    //final_cost = output[0]
    if (output[0]==10**99){
      updatefinal_cost_wth_inv('----')
      updatetoggle_text(0)
    }
    else{
      updatefinal_cost_wth_inv(parseFloat(output[0].toFixed(2)).toLocaleString('en-IN', { style: 'decimal' }))
      updatetoggle_text(1)
    }
    
    updatetenure_wth_inv(output[1])
    updatedownpaypercent_wth_inv(output[2])
    
    updatecost_output(output[3])
    updateLoan_interest_rate_output(output[4])
    //updatemin_tenure_output(output[5])
    updatemax_tenure_output(output[6])
    updateInvestment_rate_output(output[7])
    updatesavings_output(output[8])
    updatemin_downpayment_output(output[9])
    updateemi_limit_output(output[10])

    var output_wout_inv = without_invest(cost,Loan_interest_rate,min_tenure,max_tenure,savings,emi_limit)

    updatefinal_cost_wout_inv(parseFloat(output_wout_inv[0].toFixed(2)).toLocaleString('en-IN', { style: 'decimal' }))
    updatetenure_wout_inv(output_wout_inv[1])



    console.log(output)
    console.log(output_wout_inv)}
  }
  //cost,Loan_interest_rate,min_tenure,max_tenure,Investment_interest_rate,savings,min_downpayment,emi_limit

  const [toggle,updatetoggle]=useState(false)
  const [toggle_wot_inv,updatetoggle_wot_inv]=useState(false)

  const hide=()=>{
    updatetoggle(!toggle) //this is for the with investment explain button toggle

  }

  const hide_wth_inv=()=>{
    updatetoggle_wot_inv(!toggle_wot_inv) //this is for the without investment explain button toggle

  }



<div className="col-8" style={{overflowY: 'auto',marginLeft : '40%'}}></div>
  
  return (

    <div className="container " style={{overflowY: 'auto',overflowX: 'hidden'}}>
    <div className="row">

    <div className="col-sm-12 col-md-4 text-right align-self-start" style={{ marginTop: '20px', position:'sticky',overflowX: 'hidden'}}>

    <form onSubmit={submit}>
    <div className="mb-2">
    <label htmlFor="input1" className="form-label">Cost of product</label>
    <input type="number" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updatecost(parseInt(e.target.value))}/>
    </div>

    <div className="mb-2">
    <label htmlFor="input2" className="form-label">Loan interest rate</label>
    <input type="number" step="0.01" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updateLoan_interest_rate(parseInt(e.target.value))}/>
    </div>

    {/* <div className="mb-2">
    <label htmlFor="input3" className="form-label">min tenure</label>
    <input type="number" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updatemin_tenure(parseInt(e.target.value))}/>
    </div> */}

    <div className="mb-2">
    <label htmlFor="input4" className="form-label">max tenure</label>
    <input type="number" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updatemax_tenure(parseInt(e.target.value))}/>
    </div>

    <div className="mb-2">
    <label htmlFor="input5" className="form-label">Investment interest rate</label>
    <input type="number" step="0.01" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updateInvestment_interest_rate(parseInt(e.target.value))}/>
    </div>

    <div className="mb-2">
    <label htmlFor="input6" className="form-label">min downpayment</label>
    <input type="number" step="0.01" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updatemin_downpayment(parseInt(e.target.value))}/>
    </div>

    <div className="mb-2">
    <label htmlFor="input7" className="form-label">savings</label>
    <input type="number" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updatesavings(parseInt(e.target.value))}/>
    </div>

    <div className="mb-2">
    <label htmlFor="input8" className="form-label">emi limit</label>
    <input type="number" className="form-control" id="exampleFormControlInput1"  //value={cost} 
    onChange={(e)=>updateemi_limit(parseInt(e.target.value))}/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>

    {display && <div className="col-sm-12 col-md-4" style={{overflowY: 'auto'}}>
    <h5 className="mt-3"> Final Cost With Investment </h5>
    <div className="mt-2 fs-3" >₹ {final_cost_wth_inv}</div>
    <button class="btn btn-info mt-2 mb-2" onClick={hide}>Click for details</button>
    {toggle && (
    <div id = "ext_info" style={{ border: '1px solid #000', padding: '10px', borderRadius: '5px' }}> 
    {toggle_text ? (
    <>
    <p>As per the information provided by you<br></br>
    The cost of the product is ₹{cost_output}.<br></br>
    Savings kept for the product is ₹{savings_output}.<br></br>
    As per your bank's requirement you need to make minimum downpayment of {min_downpayment_output}% that is ₹{min_downpayment_output*0.01*cost_output}.
    </p>
    <p>
    What we are suggesting<br></br>
    Instead of giving entire savings as downpayment you deposit an amount of ₹{Math.round(downpaypercent_wth_inv*0.01*savings_output)} and take credit for the rest ₹{Math.round(cost_output - (downpaypercent_wth_inv*0.01*savings_output))} with a tenure of {tenure_wth_inv} years at an EMI of ₹{Math.round(calculate_loan_amount(cost_output - (downpaypercent_wth_inv*0.01*savings_output),Loan_interest_rate_output,tenure_wth_inv)/(tenure_wth_inv*12))}.
    Now invest rest of the savings i.e. ₹{Math.round(savings_output - (downpaypercent_wth_inv*0.01*savings_output))} at {Investment_rate_output}% rate of return, for {tenure_wth_inv} years.
    </p>
    </>):
    (
    <><p>With the savings level and EMI capacity we won't have any savings left to invest hence the without investment method is preferrable</p></>
    )
    }
    </div>)} 
    
    
    <h5 className="mt-5"> Final Cost Without Investment </h5>
    <div className="mt-2 fs-3">₹ {final_cost_wout_inv}</div>
    <button class="btn btn-info mt-2 mb-2" onClick={hide_wth_inv}>Click for details</button>
    {toggle_wot_inv&&<div id = "ext_info" style={{ border: '1px solid #000', padding: '10px', borderRadius: '5px' }}> Use the entire savings of ₹{savings_output} as downpayment.
    Take a loan of ₹{cost_output-savings_output} for {tenure_wout_inv}years at an EMI of ₹{Math.round(calculate_loan_amount(cost_output - savings_output,Loan_interest_rate_output,tenure_wout_inv)/(tenure_wout_inv*12))} </div>}

    </div>}
    </div>
    </div>
  /* we have achieved how to take value
  Now import the logic into the app

    /*column 2 starts now 
  
  I can define the objective function in another file and on submit i will call that function and display the output on screen ; the input as well as the result can be kept in this Info_list file no need to divide

  Create forms for these  variable (cost, Loan_interest_rate, X, Investment_interest_rate,savings, Y,emi_limit) amd test the logic
  */
)

}
