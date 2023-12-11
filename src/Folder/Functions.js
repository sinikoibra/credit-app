function calculate_investment_return(lumpsum, investment_return_rate, investment_tenure){
        const total_return=lumpsum*(1+(investment_return_rate/100))**investment_tenure
        return total_return
    }
function calculate_loan_amount(principal, annual_interest_rate, loan_tenure_years){
    //Convert annual interest rate to monthly interest rate
    const monthly_interest_rate = annual_interest_rate / 12 / 100
    const loan_tenure_months=loan_tenure_years*12

    // Calculate EMI using the loan EMI formula
    const emi = (principal * monthly_interest_rate * (1 + monthly_interest_rate)**loan_tenure_months) / ((1 + monthly_interest_rate)**loan_tenure_months - 1)

    return emi *loan_tenure_months
    }
    
function objective_function_graph(cost, annual_interest_rate, tenure_years, investment_return_rate, savings, savings_percentage,emi_limit){

    const principal=cost-(savings*(savings_percentage/100))

    const lumpsum=savings*(1-(savings_percentage/100))

    const loan_amt = calculate_loan_amount(principal, annual_interest_rate, tenure_years)

    const invst_return = calculate_investment_return(lumpsum, investment_return_rate, tenure_years)

    var final_cost = savings-(savings - loan_amt - lumpsum - (savings*(savings_percentage/100)) + invst_return)

    if ((loan_amt/(tenure_years*12))>emi_limit){
        final_cost=final_cost+(final_cost*0.1)
    }

    if ((loan_amt/(emi_limit*12))>tenure_years){
        final_cost=final_cost*0
    }
    return final_cost
    }

export default function Obj_Func(cost,Loan_interest_rate,min_tenure,max_tenure,Investment_interest_rate,savings,min_downpayment,emi_limit){
    const min_savings_percentage = (cost/savings)*min_downpayment

    //tenure_years = np.arange(Min_tenure,Max_tenure+1,1)
    const tenure_years = Array.from({length:max_tenure - min_tenure+1},(_,i)=>min_tenure+i)
    //savings_percentage = np.arange(min_savings_percentage, 100, 0.1)
    const savings_percentage = Array.from({length:(100 - min_savings_percentage)*10},(_,i)=>min_savings_percentage+i*0.1)
    //var minarr=[max_tenure,min_tenure]
    var min_f=10**99
    var minx=0
    var miny=0
    for (let X=0;X<tenure_years.length;X++){
        for (let Y=0;Y<savings_percentage.length;Y++){
            var fun=objective_function_graph(cost, Loan_interest_rate, tenure_years[X], Investment_interest_rate,savings, savings_percentage[Y],emi_limit)
        if (fun!=0 && fun<min_f){ 
            min_f=fun
            minx=tenure_years[X]
            miny=savings_percentage[Y]
            } 
        }

    }
    //return minarr
    return([min_f,minx,miny,cost,Loan_interest_rate,min_tenure,max_tenure,Investment_interest_rate,savings,min_downpayment,emi_limit])    
}

export function without_invest(cost,Loan_interest_rate,min_tenure,max_tenure,savings,emi_limit)
{
    const principal = cost - savings
    const tenure_years = Array.from({length:max_tenure - min_tenure+1},(_,i)=>min_tenure+i)
    let finalcost = 10**99
    let tenure_yr = 0
    var totalcostarr=[]
    for (let X=0;X<tenure_years.length;X++)
    {
        const loan_amt = calculate_loan_amount(principal, Loan_interest_rate, tenure_years[X])
        var totalcost = loan_amt+savings

        if ((loan_amt/(tenure_years[X]*12))>emi_limit){
            totalcost=totalcost *1.1
        }
    
        if ((loan_amt/(emi_limit*12))>tenure_years[X]){
            totalcost=totalcost*0
        }
        totalcostarr.push((loan_amt/(tenure_years[X]*12)))
        if (totalcost!=0 && totalcost<finalcost){
            finalcost = totalcost
            tenure_yr = tenure_years[X]
        }
    }
    //return(totalcostarr)
    return([finalcost,tenure_yr])
}

/*X, Y = meshgrid(tenure_years, savings_percentage)

    min_f=10**99
    minx=0
    miny=0
    for x,y in zip(X.ravel(), Y.ravel()):
        fun=objective_function_graph(cost, Loan_interest_rate, x, Investment_interest_rate,savings, y,emi_limit)
        if fun!=0 and fun<min_f :
            min_f=fun
            minx=x
            miny=y
    result=min_f
    
    tenure = minx
    Downpayment = miny*0.01*savings
    */