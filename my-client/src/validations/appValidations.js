 const criteriaConfiguration = {
    Min5Chars: {
        regex: /.{5,}/,
        errorMsg: "Should Min 5 chars",
    },
    Exact10Digits: {
        regex: /^[0-9]{10}$/,
        errorMsg: "Exactly 10 digits",
    },
    OnlyAlpha: {
        regex: /^[a-zA-Z]+$/,
        errorMsg: "Alphabets Only",
    },
    EmailFormat: {
        regex: /^[a-zA-Z][a-zA-Z0-9_$\.]*@[a-zA-Z]{2,5}\.[a-z]{2,3}$/,
        errorMsg: "Should be in the Email format",
    },
    OnlyDigits: {
        regex: /^[0-9]+$/,
        errorMsg: "Enter Digits Only",
    },
    SpecialCharsNotAllowed: {
        regex: /^[a-zA-Z0-9]+$/,
        errorMsg: "Special Chars not allowed",
    },
    SholdNotAllowSpaces: {
        regex: /^\S*$/,
        errorMsg: "Should not allow spaces",
    },
    Required: {
        regex: /./,
        errorMsg: "Required!!!",
    },
    Password: {
        regex: /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
        errorMsg: "Min 8 chars(min 1L,1U,1S,1D)",
    },
};


const fnValidation = (inputControlObj)=>{

   const validationCriteria =inputControlObj?.criteria
   for (let i=0 ; i <validationCriteria.length ; i++){
   const criteria =  validationCriteria[i]
   const {regex,errorMsg} = criteriaConfiguration[criteria]
   if(!regex.test(inputControlObj.value)){
    inputControlObj.errMsg = errorMsg
break;
   }
   }

}

export const fnFieldValidation = (eve,inputArr)=>{
    const clonedInputControls = JSON.parse(JSON.stringify(inputArr))
    const {name,value,type,checked} = eve.target;
    let inputControlObj = clonedInputControls.find((obj)=>{
      return obj.name === name
    })
     
    inputControlObj.errMsg = ""
    if(type === 'checkbox'){
const checkedValues = inputControlObj.value ? inputControlObj.value.split(','):[]
        if(checked){
      checkedValues.push(value)
        }else{
const index = checkedValues.indexOf(value)
checkedValues.splice(index,1)
        }
        inputControlObj.value = checkedValues.join(',')

    }else{
    inputControlObj.value = value
    }
     fnValidation(inputControlObj)
   
    return clonedInputControls;
}

export const fnFormValidation =(inputArr)=>{
 const clonedInputControls =  JSON.parse(JSON.stringify(inputArr))
 const dataObj = {}
 clonedInputControls.forEach((inputControlObj)=>{
    dataObj[inputControlObj.name] = inputControlObj.value
fnValidation(inputControlObj)

 })

 const isFormValid = clonedInputControls.some((obj)=>{
return obj.errMsg
 })
return [isFormValid,dataObj,clonedInputControls]

}
export const fnReset = (inputArr)=>{
    const clonedInputControls =  JSON.parse(JSON.stringify(inputArr))
    clonedInputControls.forEach((inputControlObj)=>{
        inputControlObj.errMsg = "";
        inputControlObj.value = "" 

    })
    return clonedInputControls;
}