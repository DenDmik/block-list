import { UiButton } from "@/shared/ui/ui-button";
import { UiSelectField } from "@/shared/ui/ui-select-field";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiLink } from "@/shared/ui/ui-link";
import { UiHeader } from "@/shared/ui/ui-header";


import { useState } from "react";

// import { useEffect } from "react";

function handleAlert(){alert('Новый DIV'); console.log('Новый DIV')}



export  function HomePage() {
const[visible, setVisible]= useState(false)
const handleVisible = ()=> (setVisible(!visible))

  return (
    <main 
    className={`min-h-screen  `}>
      {visible && (<UiHeader/>)}
      <UiButton variant="primary" onClick={handleVisible}>HEY!</UiButton>
      <UiButton variant="secondary">Hey2</UiButton>
      <UiButton variant="outlined">Sing Out</UiButton>
      <UiButton disabled variant="primary">Sing In</UiButton>
      <UiTextField label='Text field' inputProps={{placeholder:"Enter email"}}/>
      <UiTextField error='Text field' inputProps={{placeholder:"Enter email"}}/>
      <UiTextField  inputProps={{placeholder:"Enter email"}}/>
      <div className="w-full h-24 p-4 m-4 border border-blue-800 
       text-4xl text-center text-blue-800" 
       onClick={handleAlert}
       >Новый DIV</div>
      <UiSelectField
      label="ooooo"
      // подчеркнут placeholder красным (нет в типах)
      // selectProps={{placeholder:'Enter '}}
      selectProps={{className:'border '}}
       options={[{value:'4',label:'option3'}]}/>

       <UiLink href={'/'}>Link</UiLink>
       {/* <UiSpinner className="text-teal-600 w-10 h-10"/> */}
       {/* <UiPageSpinner/> */}
       <UiSelectField label="SELECTFIELD-2"
       selectProps={{className:'border '}}
       options={[
        {value:'4',label:'option4'},
        {value:'7',label:'option7'}

       ]}
       />

    </main>
  );
}
