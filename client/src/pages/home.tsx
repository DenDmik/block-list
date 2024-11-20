import { authControllerGetSessionInfo, authControllerSignIn } from "@/shared/api/generated";
import { UiButton } from "@/shared/ui/ui-button";
import { UiSelectField } from "@/shared/ui/ui-select-field";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { UiLink } from "@/shared/ui/ui-link";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiHeader2 } from "@/shared/ui/2ui-header";


import { UiSelectField2 } from "@/shared/ui/2ui-select-field";
import { SignOutButton } from "@/features/auth";
import { useSessionQuery } from "@/entiities/session/queries";

// import { useEffect } from "react";


export  function HomePage() {

  const{data}=useSessionQuery()

  return (
    <main 
    className={`min-h-screen  `}>
      <UiHeader2 right={<div>
        {data?.email}
        <SignOutButton/>
      </div>}/>
      <UiHeader right={<div></div>}/>
      <UiButton variant="primary">HEY!</UiButton>
      <UiButton variant="secondary">Hey2</UiButton>
      <UiButton variant="outlined">Sing Out</UiButton>
      <UiButton disabled variant="primary">Sing In</UiButton>
      <UiTextField label='Text field' inputProps={{placeholder:"Enter email"}}/>
      <UiTextField error='Text field' inputProps={{placeholder:"Enter email"}}/>
      <UiTextField  inputProps={{placeholder:"Enter email"}}/>

      <UiSelectField
      label="ooooo"
      // подчеркнут placeholder красным (нет в типах)
      // selectProps={{placeholder:'Enter '}}
      selectProps={{className:'border '}}
       options={[{value:'4',label:'option3'}]}/>

       <UiLink href={'/'}>rtyuyytu</UiLink>
       {/* <UiSpinner className="text-teal-600 w-10 h-10"/> */}
       {/* <UiPageSpinner/> */}

    </main>
  );
}
